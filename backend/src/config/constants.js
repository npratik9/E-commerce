const Status = {
    ACTIVE:"active",
    INACTIVE:"inactive"
}


const Gender ={
    MALE: "male",
    Female: "female",
    OTHER: "other"
}

const UserRoles = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  SELLER: "seller",
};

const OrderStatus = {
  PENDING: "pending",
  VERIFIED: "verified",
  CANCELLED: "cancelled",
  DELIVERED: "completed",
};


module.exports = {
    Status,
    UserRoles,
    OrderStatus,
    Gender
}