import pandas as pd

# Load dataset
df = pd.read_csv("dataset/crop_price_dataset.csv")

print(df.head())

# Keep important columns
df = df[
    [
        'month',
        'commodity_name',
        'avg_modal_price',
        'state_name'
    ]
]

# Rename columns
df.columns = [
    'date',
    'crop',
    'price',
    'state'
]

# Remove missing values
df = df.dropna()

# Convert date
df['date'] = pd.to_datetime(df['date'])

# Convert price
df['price'] = pd.to_numeric(df['price'])

# Remove invalid values
df = df[df['price'] > 0]

# Save cleaned dataset
df.to_csv(
    "dataset/cleaned_crop_data.csv",
    index=False
)

print("Dataset cleaned successfully")
print(df.head())