<?php
/**
 * SpreadsheetController class
 * 
 */
class SpreadsheetController
{
    /**
     * Returns the data of the google spreadsheet in a json format
     *
     * @param array $params The parameters from the URL.
     */
    public function dataAction($params)
    {
        if(!file_exists("config/spreadsheet.json")) {
            print "config/spreadsheet.json is missing"; 
            http_response_code(500);
            return;
        }
        $spreadsheet = json_decode(file_get_contents("config/spreadsheet.json"));
        if(!isset($spreadsheet) || !isset($spreadsheet->spreadsheet_id) || !isset($spreadsheet->sheet)) {
            print "config/spreadsheet.json is invalid\nPlease check config/spreadsheet.json.sample for an example";
            http_response_code(500);
            return;
        }
        $values = Spreadsheet::get($spreadsheet->spreadsheet_id, $spreadsheet->sheet, 'A2:Z');
        if(!$values) {
            print "An error occured when trying to configure Google_Client\n";
            print "Potential cause: config/credentials.json does not exist\n";
            print "This file holds the json token retrieved after OAuth login\n";
            print "To create it check Google Sheets API PHP Quickstart guide";
            http_response_code(500);
        } else if (empty($values)) {
            print "No data found.\n";
            http_response_code(404);
        } else {
            // Generate the result as a json object
            $result = new stdClass();
            foreach ($values as $row) {

                if (isset($row[2]) && !empty($row[2])) {
                    // This row defines a category
                    $category = new stdClass();
                    $category->title = $row[0];
                    $category->color = $row[1];
                    $category->key_1 = $row[2];
                    $category->value_1 = $row[3];
                    $category->key_2 = $row[4];
                    $category->value_2 = $row[5];
                    $category->key_3 = $row[6];
                    $category->value_3 = $row[7];

                    $categories[$category->title] = $category;
                } else {
                    // This row defines a project
                    $project = new stdClass();
                    $project->category = $row[0];
                    $project->title = $row[1];

                    // Handling locations
                    $columnIndex = 9;
                    for ($columnIndex=9; $columnIndex < 25; $columnIndex= $columnIndex+4) { 
                        if(isset($row[$columnIndex]) && !empty($row[$columnIndex])) {
                            $location = new stdClass();
                            $location->name = $row[$columnIndex];
                            $location->subtitle = $row[$columnIndex + 1];
                            $location->url = $row[$columnIndex + 2];
                            $location->coordinates = $row[$columnIndex + 3];
                            
                            $project->locations[] = $location;
                        }
                    }
                    
                    $categories[$row[0]]->projects[] = $project;
                }
            }
            echo json_encode($categories);
        }
    }
}
