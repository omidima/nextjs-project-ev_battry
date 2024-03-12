export interface VehicleDto {
    id?: number;
    make?: string
    model?: string
    model_variant?: string
    year?: string
    mileage?: string
    battery_capacity_nominal_kwh?: string
    battery_capacity_usable_kwh?: string
    battery_warranty_months?: string
    battery_warranty_miles?: string
    battery_remaining_warranty_months?: string
    battery_remaining_warranty_miles?: string
    real_combined_max_range_miles?: string
    wltp_range_miles?: string
    wltp_efficiency_mi_per_kwh?: string
    real_battery_efficiency_mi_per_kwh?: string
    image_url?: string
}