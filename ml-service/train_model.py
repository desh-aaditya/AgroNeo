import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
df = pd.read_csv(
    "dataset/cleaned_crop_data.csv"
)

# Convert date
df['date'] = pd.to_datetime(df['date'])

# Convert date into numeric days
df['days'] = (
    df['date'] - df['date'].min()
).dt.days

# Encode crop names
crop_encoder = LabelEncoder()
df['crop_encoded'] = crop_encoder.fit_transform(df['crop'])

# Features
X = df[['days', 'crop_encoded']]

# Target
y = df['price']

# Train model
model = LinearRegression()

model.fit(X, y)

# Save model
joblib.dump(model, "crop_price_model.pkl")

# Save encoder
joblib.dump(crop_encoder, "crop_encoder.pkl")

print("Model trained successfully")