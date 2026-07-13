import re
import os

DATA_FOLDER = os.path.join(
    os.path.dirname(__file__),
    "..",
    "data"
)


class CandidateExtractor:

    @staticmethod
    def extract_email(text):

        pattern = r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'

        match = re.search(pattern, text)

        if match:
            return match.group()

        return None

    @staticmethod
    def extract_phone(text):

        pattern = r'(\+91[- ]?)?[6-9]\d{9}'

        match = re.search(pattern, text)

        if match:
            phone = match.group()

            # Remove +91, spaces and dashes
            phone = (
                phone.replace("+91", "")
                    .replace(" ", "")
                    .replace("-", "")
            )

            return phone

    

    @staticmethod
    def extract_name(text):

        lines = text.split("\n")

        for line in lines:

            line = line.strip()

            if len(line.split()) >= 2:

                return line

        return "Unknown"

    @staticmethod
    def extract_experience(text):

        pattern = r'(\d+)\+?\s*(years|year|yrs|yr)'

        match = re.search(pattern, text.lower())

        if match:
            return match.group()

        return "Not Found"

    @staticmethod
    def extract_education(text):
        
        degree_file = os.path.join(
             DATA_FOLDER,
            "degrees.txt"
        )
        with open(degree_file, "r", encoding="utf-8") as f:
            degrees = [line.strip() for line in f]
        for degree in degrees:
            if degree.lower() in text.lower():
                return degree
        
        return "Not Found"