<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->
        <link rel="stylesheet" type="text/css" href="../css/style.css" />
        <link rel="stylesheet" type="text/css" href="../css/print.css" />
    </head>
    <body>
        <div class="container">
            <div class="col-wrapper">
                <!-- INTRODUCTION -->
                <div class="introduction">
                        <h2>Une année à Erasme 2017-2018</h2>
                        <p>
                            Bienvenue sur la cartographie 2017-2018 des projets d'Erasme, living lab de la Métropole de Lyon.
                        </p>
                </div>
                <div class="col-1">
                </div>
                <div class="col-3">
                </div>
            </div>
            <!--MAP DISPLAY-->
            <div class="col-2">
                    <?php include("../resources/pictures/grand_lyon.svg"); ?> 
            </div>
            <div class="partners">
                <?php 
                // Gets every partner logo in the folder then display it
                $path = "../resources/pictures/logo-partners";
                if ($handle = opendir($path)) {

                    while (false !== ($entry = readdir($handle))) {
                
                        if ($entry != "." && $entry != "..") {
                
                            print '<img src="'.$path.'/'.$entry.'">';
                        }
                    }
                
                    closedir($handle);
                }

                ?>
            </div>
        </div>
        <!-- JQUERY -->
        <script src="../js/jquery-3.3.1.min.js"></script>
        <!-- GSAP  -->
        <script src="../js/gsap/TweenLite.min.js"></script>
        <script src="../js/gsap/Draggable.min.js"></script>
        <script src="../js/gsap/CSSPlugin.min.js"></script>

        <!-- CUSTOM -->
        <script src="../js/script.js"></script>
    </body>
</html>
