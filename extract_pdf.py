#!/usr/bin/env python3
import PyPDF2
import sys

def extract_pdf_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page_num, page in enumerate(reader.pages):
                print(f"\n=== PAGE {page_num + 1} ===")
                page_text = page.extract_text()
                if page_text:
                    text += page_text + '\n'
                    print(page_text)
            return text
    except Exception as e:
        print(f'Error reading PDF: {e}')
        return None

if __name__ == "__main__":
    pdf_path = "assets/breakfast-menu.pdf"
    extract_pdf_text(pdf_path)
