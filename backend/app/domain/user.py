import uuid
from dataclasses import dataclass, field
from datetime import datetime
from app.domain.enums import UserRole


@dataclass
class User:
    """Domain entity representing an application user."""
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    name: str = ""
    email: str = ""
    hashed_password: str = ""
    role: UserRole = UserRole.RECEPTOR
    is_active: bool = True
    created_at: datetime = field(default_factory=datetime.utcnow)
