import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from app.domain.enums import DonationStatus


@dataclass
class Donation:
    """Domain entity representing a food donation posting."""
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    donor_id: uuid.UUID = field(default_factory=uuid.uuid4)
    title: str = ""
    description: str = ""
    quantity: str = ""
    location_address: str = ""
    expiration_date: Optional[datetime] = None
    status: DonationStatus = DonationStatus.AVAILABLE
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
