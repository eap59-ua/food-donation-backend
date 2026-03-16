import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from app.domain.enums import RequestStatus


@dataclass
class Request:
    """Domain entity representing a request for a donation."""
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    donation_id: uuid.UUID = field(default_factory=uuid.uuid4)
    requester_id: uuid.UUID = field(default_factory=uuid.uuid4)
    message: Optional[str] = None
    requested_quantity: Optional[str] = None
    status: RequestStatus = RequestStatus.PENDING
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
