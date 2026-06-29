from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers
revision = "1841e6291464"
down_revision = "4b420f7344fa"
branch_labels = None
depends_on = None


# Create the PostgreSQL ENUM
user_role = sa.Enum(
    "ADMIN",
    "HR",
    "MANAGER",
    "EMPLOYEE",
    name="userrole"
)


def upgrade() -> None:
    # Create the ENUM type first
    user_role.create(op.get_bind(), checkfirst=True)

    # Add the column with a default so existing rows get a value
    op.add_column(
        "users",
        sa.Column(
            "role",
            user_role,
            nullable=False,
            server_default="EMPLOYEE"
        )
    )

    # Remove the default after existing rows are updated
    op.alter_column(
        "users",
        "role",
        server_default=None
    )


def downgrade() -> None:
    op.drop_column("users", "role")
    user_role.drop(op.get_bind(), checkfirst=True)