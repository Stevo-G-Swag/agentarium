import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';

const TerminalComponent = () => {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('/');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [fileSystem, setFileSystem] = useState({
    '/': {
      type: 'directory',
      contents: {
        'home': { type: 'directory', contents: {} },
        'etc': { type: 'directory', contents: {} },
        'var': { type: 'directory', contents: {} },
        'readme.txt': { type: 'file', content: 'Welcome to the simulated file system!' },
      },
    },
  });
  const [environmentVariables, setEnvironmentVariables] = useState({
    PATH: '/usr/local/bin:/usr/bin:/bin',
    HOME: '/home',
    USER: 'user',
  });
  const inputRef = useRef(null);

  const executeCommand = useCallback((command) => {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const commands = {
      echo: () => args.join(' '),
      pwd: () => currentDirectory,
      ls: () => {
        const currentDir = getDirectoryFromPath(currentDirectory);
        return Object.entries(currentDir.contents)
          .map(([name, item]) => `${item.type === 'directory' ? 'd' : '-'} ${name}`)
          .join('\n');
      },
      cd: () => {
        if (args.length === 0) {
          setCurrentDirectory('/home');
          return 'Changed directory to /home';
        }
        const newPath = resolvePath(args[0]);
        const newDir = getDirectoryFromPath(newPath);
        if (newDir && newDir.type === 'directory') {
          setCurrentDirectory(newPath);
          return `Changed directory to ${newPath}`;
        }
        return `cd: ${args[0]}: No such directory`;
      },
      mkdir: () => {
        if (args.length === 0) return 'Usage: mkdir <directory>';
        const newDirPath = resolvePath(args[0]);
        const parentPath = newDirPath.substring(0, newDirPath.lastIndexOf('/'));
        const dirName = newDirPath.split('/').pop();
        const parentDir = getDirectoryFromPath(parentPath);
        if (!parentDir) return `mkdir: cannot create directory '${args[0]}': No such file or directory`;
        if (parentDir.contents[dirName]) return `mkdir: cannot create directory '${args[0]}': File exists`;
        parentDir.contents[dirName] = { type: 'directory', contents: {} };
        setFileSystem({ ...fileSystem });
        return `Directory created: ${newDirPath}`;
      },
      touch: () => {
        if (args.length === 0) return 'Usage: touch <file>';
        const filePath = resolvePath(args[0]);
        const parentPath = filePath.substring(0, filePath.lastIndexOf('/'));
        const fileName = filePath.split('/').pop();
        const parentDir = getDirectoryFromPath(parentPath);
        if (!parentDir) return `touch: cannot touch '${args[0]}': No such file or directory`;
        if (parentDir.contents[fileName] && parentDir.contents[fileName].type === 'directory') {
          return `touch: cannot touch '${args[0]}': Is a directory`;
        }
        parentDir.contents[fileName] = { type: 'file', content: '' };
        setFileSystem({ ...fileSystem });
        return `File created: ${filePath}`;
      },
      cat: () => {
        if (args.length === 0) return 'Usage: cat <file>';
        const filePath = resolvePath(args[0]);
        const file = getFileFromPath(filePath);
        if (!file) return `cat: ${args[0]}: No such file or directory`;
        if (file.type === 'directory') return `cat: ${args[0]}: Is a directory`;
        return file.content;
      },
      rm: () => {
        if (args.length === 0) return 'Usage: rm [-r] <file/directory>';
        const isRecursive = args[0] === '-r';
        const targetPath = resolvePath(isRecursive ? args[1] : args[0]);
        const parentPath = targetPath.substring(0, targetPath.lastIndexOf('/'));
        const targetName = targetPath.split('/').pop();
        const parentDir = getDirectoryFromPath(parentPath);
        if (!parentDir || !parentDir.contents[targetName]) {
          return `rm: cannot remove '${targetPath}': No such file or directory`;
        }
        if (parentDir.contents[targetName].type === 'directory' && !isRecursive) {
          return `rm: cannot remove '${targetPath}': Is a directory`;
        }
        delete parentDir.contents[targetName];
        setFileSystem({ ...fileSystem });
        return `Removed: ${targetPath}`;
      },
      grep: () => {
        if (args.length < 2) return 'Usage: grep <pattern> <file>';
        const pattern = args[0];
        const filePath = resolvePath(args[1]);
        const file = getFileFromPath(filePath);
        if (!file) return `grep: ${args[1]}: No such file or directory`;
        if (file.type === 'directory') return `grep: ${args[1]}: Is a directory`;
        const lines = file.content.split('\n');
        const matches = lines.filter(line => line.includes(pattern));
        return matches.join('\n');
      },
      find: () => {
        if (args.length < 1) return 'Usage: find <directory> [-name <pattern>]';
        const startPath = resolvePath(args[0]);
        const startDir = getDirectoryFromPath(startPath);
        if (!startDir) return `find: '${args[0]}': No such file or directory`;
        const namePattern = args.indexOf('-name') !== -1 ? args[args.indexOf('-name') + 1] : null;
        const results = [];
        const search = (dir, path) => {
          Object.entries(dir.contents).forEach(([name, item]) => {
            const fullPath = `${path}/${name}`;
            if (!namePattern || name.includes(namePattern)) {
              results.push(fullPath);
            }
            if (item.type === 'directory') {
              search(item, fullPath);
            }
          });
        };
        search(startDir, startPath);
        return results.join('\n');
      },
      chmod: () => {
        if (args.length < 2) return 'Usage: chmod <mode> <file/directory>';
        const mode = args[0];
        const targetPath = resolvePath(args[1]);
        const target = getFileFromPath(targetPath);
        if (!target) return `chmod: cannot access '${args[1]}': No such file or directory`;
        // Simulating chmod by just storing the mode
        target.mode = mode;
        setFileSystem({ ...fileSystem });
        return `Changed mode of '${targetPath}' to ${mode}`;
      },
      export: () => {
        if (args.length !== 1 || !args[0].includes('=')) return 'Usage: export NAME=VALUE';
        const [name, value] = args[0].split('=');
        setEnvironmentVariables(prev => ({ ...prev, [name]: value }));
        return `Exported: ${name}=${value}`;
      },
      env: () => Object.entries(environmentVariables).map(([key, value]) => `${key}=${value}`).join('\n'),
      clear: () => {
        setOutput([]);
        return null;
      },
      help: () => 'Available commands: echo, pwd, ls, cd, mkdir, touch, cat, rm, grep, find, chmod, export, env, clear, help',
    };

    if (cmd in commands) {
      try {
        return commands[cmd]();
      } catch (error) {
        console.error(`Error executing command ${cmd}:`, error);
        return `Error executing command ${cmd}. Please try again.`;
      }
    }
    return `Command not found: ${cmd}. Type 'help' for available commands.`;
  }, [currentDirectory, fileSystem, environmentVariables]);

  const getDirectoryFromPath = (path) => {
    const parts = path.split('/').filter(Boolean);
    let current = fileSystem['/'];
    for (const part of parts) {
      if (current.type !== 'directory' || !current.contents[part]) return null;
      current = current.contents[part];
    }
    return current;
  };

  const getFileFromPath = (path) => {
    const parts = path.split('/').filter(Boolean);
    const fileName = parts.pop();
    const dirPath = '/' + parts.join('/');
    const dir = getDirectoryFromPath(dirPath);
    return dir && dir.contents[fileName];
  };

  const resolvePath = (path) => {
    if (path.startsWith('/')) return path;
    const currentParts = currentDirectory.split('/').filter(Boolean);
    const newParts = path.split('/').filter(Boolean);
    for (const part of newParts) {
      if (part === '..') currentParts.pop();
      else if (part !== '.') currentParts.push(part);
    }
    return '/' + currentParts.join('/');
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const commands = input.split('|').map(cmd => cmd.trim());
    let result = '';
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (i === 0) {
        result = executeCommand(command);
      } else {
        result = executeCommand(`echo "${result}" | ${command}`);
      }
    }
    setOutput(prev => [...prev, `$ ${input}`, result].filter(Boolean));
    setHistory(prev => [input, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIndex(prev => {
        const newIndex = Math.min(prev + 1, history.length - 1);
        setInput(history[newIndex] || '');
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIndex(prev => {
        const newIndex = Math.max(prev - 1, -1);
        setInput(newIndex === -1 ? '' : history[newIndex]);
        return newIndex;
      });
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(' ');
      const lastPart = parts[parts.length - 1];
      const currentDir = getDirectoryFromPath(currentDirectory);
      const matches = Object.keys(currentDir.contents).filter(name => name.startsWith(lastPart));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(' '));
      } else if (matches.length > 1) {
        const commonPrefix = matches.reduce((a, b) => {
          let i = 0;
          while (i < a.length && a[i] === b[i]) i++;
          return a.slice(0, i);
        });
        if (commonPrefix.length > lastPart.length) {
          parts[parts.length - 1] = commonPrefix;
          setInput(parts.join(' '));
        } else {
          setOutput(prev => [...prev, matches.join('  ')]);
        }
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [output]);

  return (
    <motion.div 
      className="h-full flex flex-col bg-black/30 rounded-lg backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollArea className="flex-grow text-green-400 font-mono text-sm mb-4">
        {output.map((line, index) => (
          <motion.div 
            key={index} 
            className="break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {line}
          </motion.div>
        ))}
      </ScrollArea>
      <form onSubmit={handleCommand} className="flex">
        <span className="text-green-400 mr-2">{currentDirectory}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent text-green-400 outline-none"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </motion.div>
  );
};

export default TerminalComponent;
