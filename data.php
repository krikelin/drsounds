<?php
header('content-type: application/json');
$dbh = new PDO('mysql:host=localhost;dbname=drsounds;charset=utf-8', 'root', '123');
$qsongs = $dbh->prepare("SELECT * FROM songs ORDER BY time ASC");
$qrelations = $dbh->prepare("SELECT * FROM relations ORDER BY time ASC");
$qsongs->execute();
$qrelations->execute();

$json = array();
$json['nodes'] = array();
$json['edges'] = array();
$songs = $qsongs->fetchAll();
$relations = $qrelations->fetchAll();
foreach($songs as $song) {
	$json['nodes'][$song['slug']] = array(
		'color' => $song['color'],
		'label' => $song['title'],
		'link' => $song['link'],
		'shape' => 'rectangle'
	);
}
foreach($relations as $relation) {
	$json['edges'][$relation['song1']]= array($relation['song2'] => array());
}
$json = json_encode($json);
echo $json;
?>