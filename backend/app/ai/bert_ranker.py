from sentence_transformers import SentenceTransformer
from sentence_transformers import util


class BERTRanker:

    def __init__(self):

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    def rank_candidates(
        self,
        resumes,
        job_description
    ):

        job_embedding = self.model.encode(
            job_description,
            convert_to_tensor=True
        )

        ranked_candidates = []

        for resume in resumes:

            resume_embedding = self.model.encode(
                resume["resume_text"],
                convert_to_tensor=True
            )

            similarity = util.cos_sim(
                resume_embedding,
                job_embedding
            )

            ranked_candidates.append(
                {
                    "candidate": resume["candidate"],
                    "score": round(
                        float(similarity) * 100,
                        2
                    )
                }
            )

        ranked_candidates.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        return ranked_candidates