from sentence_transformers import SentenceTransformer
from sentence_transformers import util


class SemanticMatcher:

    def __init__(self):
        # Load the pre-trained model once
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

    def calculate_similarity(self, resume_text: str, job_description: str):
        """
        Compare resume text with a job description
        and return a similarity score (0–100%).
        """

        # Convert text to embeddings
        resume_embedding = self.model.encode(
            resume_text,
            convert_to_tensor=True
        )

        job_embedding = self.model.encode(
            job_description,
            convert_to_tensor=True
        )

        # Compute cosine similarity
        score = util.cos_sim(
            resume_embedding,
            job_embedding
        )

        # Convert to percentage
        similarity = round(float(score) * 100, 2)

        return similarity