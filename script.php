<?php
  header('Content-Type: application/json');
  const TEN_MINS = 600;
  $stamp = time();
  // file_put_contents();
  // echo $availData;
  function findFile($f) {

  }
  $fileName = $stamp - ($stamp % TEN_MINS) . ".txt";
  if(file_exists($fileName)) {
    $availData = file_get_contents($fileName);
  } else {
    $path = __DIR__ . "/";
    $availData = file_get_contents('http://rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability&APIToken=NDY5OTI%3d-XDY6KCjhwhg%3d&propertyCode=p0155985');
    if($availData === false) {
      $oldFiles = glob("$path*.txt");
      if(count($oldFiles) > 0){
        $availData = file_get_contents($oldFiles[0]);
      } else {
        echo 'We failed to externally load the data and have none available cached, please try again later =)';
      }
      $availData = file_get_contents($fileName);
    } else {
      array_map("unlink", glob("$path*.txt"));
      file_put_contents($fileName, $availData);
    }
  }
  echo $availData;
 ?>
