import spacy
import os

nlp = spacy.load("en_core_web_sm")


class SkillExtractor:

    def __init__(self):

        skill_file = os.path.join(
            "app",
            "data",
            "skills.txt"
        )

        with open(skill_file, "r") as file:
            self.skills = {
                skill.strip().lower()
                for skill in file.readlines()
            }

    def extract_skills(self, text):

        doc = nlp(text)

        found_skills = set()

        for token in doc:

            word = token.text.lower()

            if word in self.skills:
                found_skills.add(token.text)

        return sorted(found_skills)