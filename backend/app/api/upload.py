import os
from uuid import uuid4

from fastapi import APIRouter, File, UploadFile

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("")
async def upload_file(
    file: UploadFile = File(...),
):

    extension = file.filename.split(".")[-1]

    filename = f"{uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename,
    )

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "filename": filename,
        "path": filepath,
    }