<?php
/**
 * Spreadsheet Class
 * Provides access to a Google Drive Spreadsheet.
 *
 */
class Spreadsheet {
    /**
     * Returns an authorized API client.
     * @return Google_Client the authorized client object
     */
    private static function getClient()
    {
        $client = new Google_Client();
        $client->setApplicationName('Google Sheets API PHP Quickstart');
        $client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);
        $client->setAuthConfig('config/client_secret.json');
        $client->setAccessType('offline');

        // Load previously authorized credentials from a file.
        $credentialsPath = Spreadsheet::expandHomeDirectory('config/credentials.json');
        if (file_exists($credentialsPath)) {
            $accessToken = json_decode(file_get_contents($credentialsPath), true);
        } else {
            print "config/credentials.json does not exist\nTo create it check Google Sheets API PHP Quickstart guide";
            http_response_code(500);
            return; 
        }
        $client->setAccessToken($accessToken);

        // Refresh the token if it's expired.
        if ($client->isAccessTokenExpired()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
        }
        return $client;
    }

    /**
     * Expands the home directory alias '~' to the full path.
     * @param string $path the path to expand.
     * @return string the expanded path.
     */
    private static function expandHomeDirectory($path)
    {
        $homeDirectory = getenv('HOME');
        if (empty($homeDirectory)) {
            $homeDirectory = getenv('HOMEDRIVE') . getenv('HOMEPATH');
        }
        return str_replace('~', realpath($homeDirectory), $path);
    }

    /**
     * This method reads the google sheets values using the $spreadsheetId
     * and return the values in the specified $sheet and $range
     * 
     * NB: - This method removes all trailing empty rows and columns
     *     - Uses the A1 Documentation. More info on :
     * https://developers.google.com/sheets/api/guides/concepts#a1_notation
     * 
     * @param string $spreadsheetId Google Sheets Id
     * @param string $sheet the name of the sheet to retrieve the data from
     * @param string $range range of the cells to retrieve data from
     * @return array the values retrieved from the google sheets api
     */
    public static function get($spreadsheetId, $sheet, $range)
    {
        // Get the API client and construct the service object.
        $client = Spreadsheet::getClient();
        $service = new Google_Service_Sheets($client);
        $response = $service->spreadsheets_values->get($spreadsheetId, "'$sheet'!$range");
 
        return $response->getValues();
    }
}

?>