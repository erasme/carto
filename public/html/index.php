<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->
        <link rel="stylesheet" type="text/css" href="../css/style.css" />
        <link rel="stylesheet" type="text/css" href="../css/print.css" />
    </head>
    <body>
        <div class="container">
            <div class="col-1">
                <!-- INTRODUCTION -->
                <div class="introduction">
                    <h2>Cartographie des projets</h2>
                    <p>
                        Bienvenue sur la cartographie 2017-2018 des projets d'Erasme, living lab de la Métropole de Lyon.
                    </p>
                </div>
                
            </div>
            <!--MAP DISPLAY-->
            <div class="col-2">
                    <?php include("../resources/pictures/grand_lyon.svg"); ?> 
            </div>
            <div class="partners">
                <?php 
                // Gets every partner logo in the folder then display it
                /*$path = "../resources/pictures/logo-partners";
                if ($handle = opendir($path)) {

                    while (false !== ($entry = readdir($handle))) {
                
                        if ($entry != "." && $entry != "..") {
                
                            print '<img src="'.$path.'/'.$entry.'">';
                        }
                    }
                
                    closedir($handle);
                }*/

                ?>
            </div>
        </div>
        <!-- JQUERY -->
        <script src="../js/jquery-3.3.1.min.js"></script>
        <!-- CUSTOM -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenLite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/utils/Draggable.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/plugins/CSSPlugin.min.js"></script>

        <script src="../js/script.js"></script>
    </body>
</html>
