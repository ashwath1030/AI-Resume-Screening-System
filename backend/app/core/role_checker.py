from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.core.security import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class RoleChecker:

    def __init__(self, allowed_roles: list):
        self.allowed_roles = allowed_roles

    def __call__(self, token: str = Depends(oauth2_scheme)):

        print("TOKEN RECEIVED:", token)

        try:

            payload = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=[ALGORITHM]
            )

            print("PAYLOAD:", payload)

            role = payload.get("role")

            print("ROLE:", role)

            if role not in self.allowed_roles:
                print("ROLE NOT ALLOWED")
                raise HTTPException(
                    status_code=403,
                    detail="Permission Denied"
                )

            return payload

        except JWTError as e:

            print("JWT ERROR:", str(e))

            raise HTTPException(
                status_code=401,
                detail="Invalid Token"
            )