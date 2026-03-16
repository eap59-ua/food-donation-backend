import enum


class UserRole(str, enum.Enum):
    DONANTE = "DONANTE"
    RECEPTOR = "RECEPTOR"
    ONG = "ONG"
    ADMIN = "ADMIN"


class DonationStatus(str, enum.Enum):
    AVAILABLE = "AVAILABLE"
    RESERVED = "RESERVED"
    COMPLETED = "COMPLETED"
    EXPIRED = "EXPIRED"


class RequestStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
