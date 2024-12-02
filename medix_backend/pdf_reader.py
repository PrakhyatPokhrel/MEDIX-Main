import pdfplumber
import re

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    with pdfplumber.open(pdf_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text

def find_value_by_label(text, label, pattern=r'\d+\.\d+'):
    """Finds a value associated with a specific label in the extracted text using a regex."""
    regex = rf'{label}.*?({pattern})'
    match = re.search(regex, text, re.IGNORECASE)
    if match:
        return match.group(1)
    return None

def extract_health_metrics_from_pdf(pdf_path):
    """Extracts RBC count, Cholesterol, Glucose, and Blood Pressure bounds from a PDF blood report."""
    text = extract_text_from_pdf(pdf_path)

    metrics = {
        'RBC Count': find_value_by_label(text, r'RBC'),
        'Cholesterol': find_value_by_label(text, r'Cholesterol'),
        'Glucose': find_value_by_label(text, r'Glucose'),
        'Blood Pressure Low': find_value_by_label(text, r'Blood Pressure Low|BP Low|Systolic', r'\d+'),
        'Blood Pressure High': find_value_by_label(text, r'Blood Pressure High|BP High|Diastolic', r'\d+')
    }
    return metrics

if __name__ == "__main__":
    pdf_file_path = 'data.pdf'  # Replace with the path to your PDF file
    metrics = extract_health_metrics_from_pdf(pdf_file_path)
    
    for metric, value in metrics.items():
        if value:
            print(f"{metric}: {value}")
        else:
            print(f"{metric} not found.")
def calculate_bmi(weight, height_meters):
    """Calculates the BMI given weight in kilograms and height in meters."""
    bmi = weight / (height_meters ** 2)
    return bmi

def categorize_bmi(bmi, age, gender):
    """Categorizes the BMI based on standard categories and includes age and gender considerations."""
    if gender.lower() == 'female':
        if age < 18:
            category = "Children/Teenager category needed"  # Age-specific categories are needed for children/teens
        elif 18 <= age < 65:
            if bmi < 18.5:
                category = "Underweight"
            elif 18.5 <= bmi < 24.9:
                category = "Normal weight"
            elif 25 <= bmi < 29.9:
                category = "Overweight"
            else:
                category = "Obesity"
        else:
            if bmi < 23:
                category = "Underweight"
            elif 23 <= bmi < 29.9:
                category = "Normal weight"
            elif 30 <= bmi < 34.9:
                category = "Overweight"
            else:
                category = "Obesity"
    else:  # Assume 'male'
        if age < 18:
            category = "Children/Teenager category needed"  # Age-specific categories are needed for children/teens
        elif 18 <= age < 65:
            if bmi < 18.5:
                category = "Underweight"
            elif 18.5 <= bmi < 24.9:
                category = "Normal weight"
            elif 25 <= bmi < 29.9:
                category = "Overweight"
            else:
                category = "Obesity"
        else:
            if bmi < 23:
                category = "Underweight"
            elif 23 <= bmi < 29.9:
                category = "Normal weight"
            elif 30 <= bmi < 34.9:
                category = "Overweight"
            else:
                category = "Obesity"

    return category

def convert_height_to_meters(height_ft_in):
    """Converts height from feet and inches in decimal format to meters."""
    feet = int(height_ft_in)
    inches = (height_ft_in - feet) * 10  # Convert the decimal part to inches
    total_inches = feet * 12 + inches
    height_meters = total_inches * 0.0254  # 1 inch = 0.0254 meters
    return height_meters

if __name__ == "__main__":
    weight = float(input("Enter your weight in kilograms: "))
    height_ft_in = float(input("Enter your height in feet.inches (e.g., 5.7): "))
    age = int(input("Enter your age: "))
    gender = input("Enter your gender (male/female): ").strip().lower()

    height_meters = convert_height_to_meters(height_ft_in)
    bmi = calculate_bmi(weight, height_meters)
    category = categorize_bmi(bmi, age, gender)

    print(f"Your BMI is: {bmi:.2f}")
    print(f"Category: {category}")
