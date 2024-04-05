import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

service = Service(executable_path='chromedriver.exe')
driver = webdriver.Chrome(service=service)
driver.get('https://ssb.it.uab.edu/pls/sctprod/z1449_class_lookup.enter_parms')

term_dropdown = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, "in_term"))
)

Select(term_dropdown).select_by_value("202430")

submit_button = driver.find_element(By.XPATH, "//input[@type='submit'][@value='SUBMIT']")
submit_button.click()

WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, "in_subj"))
)

subject_dropdown = Select(driver.find_element(By.ID, "in_subj"))
subject_dropdown.select_by_value("CS")

submit_button = driver.find_element(By.XPATH, "//input[@type='submit'][@value='SUBMIT']")
submit_button.click()

WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.TAG_NAME, "body"))
)

rows = WebDriverWait(driver, 10).until(
    EC.visibility_of_all_elements_located((By.XPATH, "//table[@class='bordertable']//tr[@style]"))
)

classes_info = []

for row in rows:
    cells = row.find_elements(By.TAG_NAME, 'td')
    
    class_info = {
        'CRN': cells[0].text.strip(),
        'Subject': cells[1].text.strip(),
        'Course Number': cells[2].text.strip(),
        'Section': cells[3].text.strip(),
        'Credit': cells[4].text.strip(),
        'Title': cells[5].text.strip(),
        'Days': cells[6].text.strip(),
        'Time': cells[7].text.strip(),
        'Capacity': cells[8].text.strip(),
        'Enrolled': cells[9].text.strip(),
        'Remaining': cells[10].text.strip(),
        'Instructor': cells[11].text.strip(),
        'Date Range': cells[12].text.strip(),
        'Location': cells[13].text.strip(),
    }
    
    classes_info.append(class_info)

driver.quit()

with open('spring_2024_cs_classes.json', 'w', encoding='utf-8') as f:
    json.dump(classes_info, f, ensure_ascii=False, indent=4)

print("Data has been written to classes_info.json")