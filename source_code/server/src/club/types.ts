enum ApprovalStatus {
  Pending,
  Approved,
  Denied,
}

interface IClub {
  id: number;
  name: string;
  phone: string;
  email: string;
  approvalStatus: ApprovalStatus;
  description?: string;
  ownerId: number;
  locationId: number;
}

export { ApprovalStatus, IClub };
