from frontend_tools import create_form, style_component

class FrontendAgent:
    def handle(self, query, conversation_history):
        form_html = create_form()
        form_css = style_component()
        return f"Frontend Code:\n\nHTML:\n{form_html}\n\nCSS:\n{form_css}"
