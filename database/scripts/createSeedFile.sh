#!/bin/bash

# This script is used to create a seed file for the database
# by creating a 'seed.sql' file at database/supabase/seed.sql
# and appending all sql files in database/supabase/seed to it.


if [ -f "./database/supabase/seed.sql" ]; then
    echo "Deleting the seed file..."
    rm -rf "./database/supabase/seed.sql"
fi

touch "./database/supabase/seed.sql"

# Append all sql files in the seed directory to the seed.sql file
for file in "./database/supabase/seed"/*.sql
do
    cat "$file" >> "./database/supabase/seed.sql"
    echo "" >> "./database/supabase/seed.sql"
    echo "" >> "./database/supabase/seed.sql"
done

# Print the seed.sql file
cat "./database/supabase/seed.sql"