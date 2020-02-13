export enum DefaultAttribute {
    Id = "id",
    CreatedAt = "createdAt",
    UpdatedAt = "updatedAt",
}

export const DefaultAttributeSet: Set<DefaultAttribute> = new Set([
    DefaultAttribute.Id,
    DefaultAttribute.CreatedAt,
    DefaultAttribute.UpdatedAt
]);
