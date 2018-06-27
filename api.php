<?php
/**
 * Front Controller, used as a router
 *
 * This particular Front Controller defines a route table, which says
 * which defines which URLs and HTTP methods map to which actions.
 *
 */
require_once 'vendor/autoload.php';

// Define the routes table
$routes = array(
    '/\/spreadsheet/' => array('SpreadsheetController', array(
        'GET' => 'dataAction',
    ))
);

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

// Decide which route to run
foreach ($routes as $url => $action) {
    // See if the route matches the current request
    $matches = preg_match($url, $request_uri, $params);
    // If it matches...
    if ($matches > 0) {
        if(array_key_exists($request_method, $action[1])) {
            // Run this action, passing the parameters.
            $controller = new $action[0];
            $controller->{$action[1][$request_method]}($params);
            exit;
        }
    }
}
include 'src/view/noRouteView.php';