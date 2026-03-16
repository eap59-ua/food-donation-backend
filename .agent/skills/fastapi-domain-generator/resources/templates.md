# FastAPI Hexagonal Templates

These templates serve as boilerplate for new domains. Replace `{{domain_name}}` and `{{DomainName}}` accordingly.

### 1. Domain Entity (`domain/entities/{{domain_name}}.py`)
```python
from uuid import UUID
from datetime import datetime
from typing import Optional

class {{DomainName}}:
    def __init__(
        self,
        id: Optional[UUID] = None,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None,
        # Add your fields here
    ):
        self.id = id
        self.created_at = created_at
        self.updated_at = updated_at
```

### 2. Repository Interface (`domain/repositories/{{domain_name}}_repository.py`)
```python
from abc import ABC, abstractmethod
from uuid import UUID
from typing import List, Optional
from app.domain.entities.{{domain_name}} import {{DomainName}}

class {{DomainName}}Repository(ABC):
    @abstractmethod
    async def create(self, entity: {{DomainName}}) -> {{DomainName}}:
        pass

    @abstractmethod
    async def get_by_id(self, id: UUID) -> Optional[{{DomainName}}]:
        pass

    @abstractmethod
    async def list_all(self) -> List[{{DomainName}}]:
        pass
```

### 3. Presentation Schema (`presentation/schemas/{{domain_name}}.py`)
```python
from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime

class {{DomainName}}Base(BaseModel):
    # Add common fields here
    pass

class {{DomainName}}Create({{DomainName}}Base):
    pass

class {{DomainName}}Response({{DomainName}}Base):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
```
