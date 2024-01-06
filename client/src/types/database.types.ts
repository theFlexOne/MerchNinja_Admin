export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cart_items: {
        Row: {
          cart_id: number
          created_at: string
          deleted_at: string | null
          id: number
          quantity: number
          updated_at: string
        }
        Insert: {
          cart_id: number
          created_at?: string
          deleted_at?: string | null
          id?: never
          quantity: number
          updated_at?: string
        }
        Update: {
          cart_id?: number
          created_at?: string
          deleted_at?: string | null
          id?: never
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          }
        ]
      }
      carts: {
        Row: {
          created_at: string
          customer_id: string
          deleted_at: string | null
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          deleted_at?: string | null
          id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          deleted_at?: string | null
          id?: never
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      country_codes: {
        Row: {
          code: number
          isocode2: string
          isocode3: string
          name: string
        }
        Insert: {
          code: number
          isocode2: string
          isocode3: string
          name: string
        }
        Update: {
          code?: number
          isocode2?: string
          isocode3?: string
          name?: string
        }
        Relationships: []
      }
      customer_addresses: {
        Row: {
          city: string
          country_code: number
          created_at: string
          customer_id: string
          deleted_at: string | null
          id: number
          state: string
          street: string
          street2: string | null
          updated_at: string
          zip: string
        }
        Insert: {
          city: string
          country_code?: number
          created_at?: string
          customer_id: string
          deleted_at?: string | null
          id?: never
          state: string
          street: string
          street2?: string | null
          updated_at?: string
          zip: string
        }
        Update: {
          city?: string
          country_code?: number
          created_at?: string
          customer_id?: string
          deleted_at?: string | null
          id?: never
          state?: string
          street?: string
          street2?: string | null
          updated_at?: string
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      customer_profiles: {
        Row: {
          created_at: string
          customer_id: string
          deleted_at: string | null
          email: string
          id: string
          role: Database["public"]["Enums"]["role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          deleted_at?: string | null
          email: string
          id?: string
          role?: Database["public"]["Enums"]["role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          deleted_at?: string | null
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_profiles_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          created_at: string
          deleted_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      discounts: {
        Row: {
          created_at: string
          deleted_at: string | null
          end_date: string | null
          id: string
          qualifiers: string[] | null
          start_date: string | null
          type: Database["public"]["Enums"]["discount_type"]
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          end_date?: string | null
          id?: string
          qualifiers?: string[] | null
          start_date?: string | null
          type: Database["public"]["Enums"]["discount_type"]
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          end_date?: string | null
          id?: string
          qualifiers?: string[] | null
          start_date?: string | null
          type?: Database["public"]["Enums"]["discount_type"]
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          stock_quantity: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          order_id: string
          product_variant_id: number
          quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          order_id: string
          product_variant_id: number
          quantity: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          order_id?: string
          product_variant_id?: number
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string
          deleted_at: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          deleted_at?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          deleted_at?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      orders_discounts: {
        Row: {
          created_at: string
          deleted_at: string | null
          discount_id: string
          id: number
          order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          discount_id: string
          id?: number
          order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          discount_id?: string
          id?: number
          order_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_discounts_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_discounts_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      product_brands: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          name: string
          parent_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name: string
          parent_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string
          parent_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      product_groups: {
        Row: {
          attribute_ids: number[]
          created_at: string
          deleted_at: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          attribute_ids?: number[]
          created_at?: string
          deleted_at?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          attribute_ids?: number[]
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          created_at: string
          customer_id: string
          deleted_at: string | null
          id: number
          message: string
          product_id: string
          rating: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          deleted_at?: string | null
          id?: number
          message?: string
          product_id: string
          rating: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          deleted_at?: string | null
          id?: number
          message?: string
          product_id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      product_tags: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          product_id: string
          tag_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          product_id: string
          tag_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          product_id?: string
          tag_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand_id: number | null
          briefdescription: string | null
          categories: string[] | null
          category_id: number | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          product_group_id: number | null
          thumbnail: string | null
          updated_at: string
        }
        Insert: {
          brand_id?: number | null
          briefdescription?: string | null
          categories?: string[] | null
          category_id?: number | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          product_group_id?: number | null
          thumbnail?: string | null
          updated_at?: string
        }
        Update: {
          brand_id?: number | null
          briefdescription?: string | null
          categories?: string[] | null
          category_id?: number | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          product_group_id?: number | null
          thumbnail?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "product_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_product_group_id_fkey"
            columns: ["product_group_id"]
            isOneToOne: false
            referencedRelation: "product_groups"
            referencedColumns: ["id"]
          }
        ]
      }
      products_attributes: {
        Row: {
          attribute_id: number
          created_at: string
          deleted_at: string | null
          id: number
          product_id: string
          updated_at: string
          value: string
        }
        Insert: {
          attribute_id: number
          created_at?: string
          deleted_at?: string | null
          id?: number
          product_id: string
          updated_at?: string
          value: string
        }
        Update: {
          attribute_id?: number
          created_at?: string
          deleted_at?: string | null
          id?: number
          product_id?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      products_specs: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          product_id: string
          spec_field_id: number
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          product_id: string
          spec_field_id: number
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          product_id?: string
          spec_field_id?: number
          updated_at?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_specs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_specs_spec_field_id_fkey"
            columns: ["spec_field_id"]
            isOneToOne: false
            referencedRelation: "spec_fields"
            referencedColumns: ["id"]
          }
        ]
      }
      spec_fields: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      us_states: {
        Row: {
          abbreviation: string | null
          name: string
          type: Database["public"]["Enums"]["us_state_type"]
        }
        Insert: {
          abbreviation?: string | null
          name: string
          type: Database["public"]["Enums"]["us_state_type"]
        }
        Update: {
          abbreviation?: string | null
          name?: string
          type?: Database["public"]["Enums"]["us_state_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_category_leafs: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          parent_id: number
        }[]
      }
      fn_check_attribute_ids_exist: {
        Args: {
          p_attribute_ids: number[]
        }
        Returns: boolean
      }
      fn_check_unique_elements_in_array: {
        Args: {
          bigint_array: number[]
        }
        Returns: boolean
      }
      fn_check_valid_product_attribute: {
        Args: {
          p_attribute_id: number
          p_product_id: string
        }
        Returns: boolean
      }
      fn_create_categories: {
        Args: {
          p_category_names: string[]
        }
        Returns: number
      }
      fn_create_category: {
        Args: {
          p_name: string
          p_parent_id: number
        }
        Returns: number
      }
      fn_create_product: {
        Args: {
          p_name: string
          p_description: string
          p_price: number
          p_thumbnail: string
          p_brand: string
          p_category: string
          p_parent_category: string
          p_specs: Json
          p_tags: string[]
        }
        Returns: string
      }
      fn_create_product_categories: {
        Args: {
          p_product_id: string
          p_category_id: number
        }
        Returns: number
      }
      fn_create_product_specs: {
        Args: {
          p_product_id: string
          specs: Json
        }
        Returns: undefined
      }
      fn_create_product_tags: {
        Args: {
          p_product_id: string
          p_tags: string[]
        }
        Returns: undefined
      }
      fn_create_product_variant:
        | {
            Args: {
              p_product_id: string
              p_price: number
              p_image_urls: string[]
              p_specs: Json
            }
            Returns: number
          }
        | {
            Args: {
              p_product_id: string
              p_price_offset: number
              p_stock_quantity: number
              p_image_urls: string[]
              p_attributes: Json
            }
            Returns: undefined
          }
      fn_create_product_variant_specs: {
        Args: {
          p_variant_id: number
          p_specs: Json
        }
        Returns: undefined
      }
      fn_find_or_create_brand: {
        Args: {
          p_name: string
        }
        Returns: number
      }
      fn_find_or_create_category:
        | {
            Args: {
              p_cat_name: string
              p_parent_id: number
            }
            Returns: number
          }
        | {
            Args: {
              p_cat_name: string
              p_parent_name: string
            }
            Returns: number
          }
      fn_find_or_create_tag: {
        Args: {
          p_tag_name: string
        }
        Returns: number
      }
      fn_get_category_chain: {
        Args: {
          p_product_id: string
        }
        Returns: unknown
      }
      fn_get_category_tree: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      fn_get_child_categories: {
        Args: {
          p_parent_id: number
        }
        Returns: Json
      }
      fn_get_product_categories: {
        Args: {
          p_product_id: string
        }
        Returns: unknown
      }
      fn_get_product_product_variants_ids: {
        Args: {
          p_product_id: string
        }
        Returns: unknown
      }
      fn_get_product_specs: {
        Args: {
          p_product_id: string
        }
        Returns: Json
      }
      fn_get_product_variant_rating: {
        Args: {
          p_variant_id: number
        }
        Returns: number
      }
      fn_get_product_variant_specs: {
        Args: {
          p_variant_id: number
        }
        Returns: Json
      }
      fn_get_to_many_foreign_tables_array: {
        Args: {
          p_table_name: string
        }
        Returns: unknown
      }
      fn_get_to_one_foreign_tables_array: {
        Args: {
          p_table_name: string
        }
        Returns: unknown
      }
      fn_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      fn_is_product_discounted: {
        Args: {
          p_product_id: string
        }
        Returns: boolean
      }
      ids_exist: {
        Args: {
          ids: number[]
        }
        Returns: boolean
      }
    }
    Enums: {
      discount_type: "PERCENTAGE" | "FIXED"
      role: "USER" | "ADMIN"
      us_state_type: "STATE" | "FEDERAL DISTRICT" | "TERRITORY"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

