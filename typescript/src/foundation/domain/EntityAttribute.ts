export enum EntityAttribute {
    Id = "id",
    CreatedAt = "createdAt",
    UpdatedAt = "updatedAt",
}

export const DefaultEntityAttributeSet: Set<EntityAttribute> = new Set([
    EntityAttribute.Id,
    EntityAttribute.CreatedAt,
    EntityAttribute.UpdatedAt
]);
