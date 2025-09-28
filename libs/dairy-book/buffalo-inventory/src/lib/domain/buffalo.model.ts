export interface Buffalo {
  id: string;
  userId: string;
  tagId: string;
  breedTypeId: string; // FK to breed_type
  healthStatusId: string; // FK to health_status
  ageInMonths: number;
  weightKg: number;
  lastCheckupDate: Date;
  notes?: text;
  dateOfCreation: Date;
  dateLastModified: Date;
  createdBy: string;
  updatedBy: string;
}
