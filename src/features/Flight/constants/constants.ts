export const promotionRate = 0.5;

export const cabinTypes = { ECONOMY: 'ECONOMY', BUSINESS: 'BUSINESS' } as const;

export type CabinType = (typeof cabinTypes)[keyof typeof cabinTypes];
