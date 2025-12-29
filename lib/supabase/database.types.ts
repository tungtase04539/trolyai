export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    role: 'ADMIN' | 'GUEST'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    role?: 'ADMIN' | 'GUEST'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    role?: 'ADMIN' | 'GUEST'
                    created_at?: string
                    updated_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    description: string
                    price: number
                    chatbot_link: string
                    code_mode: 'SINGLE' | 'MULTIPLE'
                    single_code: string | null
                    image_url: string | null
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description: string
                    price: number
                    chatbot_link: string
                    code_mode?: 'SINGLE' | 'MULTIPLE'
                    single_code?: string | null
                    image_url?: string | null
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string
                    price?: number
                    chatbot_link?: string
                    code_mode?: 'SINGLE' | 'MULTIPLE'
                    single_code?: string | null
                    image_url?: string | null
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            activation_codes: {
                Row: {
                    id: string
                    product_id: string
                    code: string
                    is_used: boolean
                    used_by_order_id: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    code: string
                    is_used?: boolean
                    used_by_order_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    code?: string
                    is_used?: boolean
                    used_by_order_id?: string | null
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    amount: number
                    status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
                    chatbot_link: string
                    activation_code: string
                    sepay_transaction_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    amount: number
                    status?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
                    chatbot_link: string
                    activation_code: string
                    sepay_transaction_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    amount?: number
                    status?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
                    chatbot_link?: string
                    activation_code?: string
                    sepay_transaction_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            payment_logs: {
                Row: {
                    id: string
                    order_id: string
                    sepay_data: Json
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    sepay_data: Json
                    status: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    sepay_data?: Json
                    status?: string
                    created_at?: string
                }
            }
        }
    }
}
