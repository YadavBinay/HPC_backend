import os

# Define the directory containing the route files
routes_dir = os.path.join(os.getcwd(), 'controllers')

# Define the output file
output_file = os.path.join(os.getcwd(), 'combined_controllers.txt')

# List to hold the contents of each file
all_contents = []

# Iterate over all files in the routes directory
for filename in os.listdir(routes_dir):
    file_path = os.path.join(routes_dir, filename)
    
    # Ensure it's a file
    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            all_contents.append(file.read())

# Combine all contents into a single string
combined_contents = "\n\n".join(all_contents)

# Write the combined contents to the output file
with open(output_file, 'w') as file:
    file.write(combined_contents)

print(f"Combined contents saved to {output_file}")
