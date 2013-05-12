<?php
header('content-type: application/json');
$timefilter = isset($_GET['start']) && isset($_GET['end']);
$interlace = true;
$dbh = new PDO('mysql:host=localhost;dbname=drsounds;charset=utf-8', 'root', '123');
$qsongs = $dbh->prepare("SELECT * FROM songs ORDER BY time ASC");
if($timefilter) {
	$qsongs = $dbh->prepare("SELECT * FROM songs WHERE time BETWEEN :start AND :end");

}
$qrelations = $dbh->prepare("SELECT * FROM relations WHERE time BETWEEN :start AND :end ORDER BY time ASC");
$params = array();

$qstartSongs = $dbh->prepare("SELECT * FROM songs WHERE time BETWEEN :start AND :end AND (SELECT count(*) FROM relations WHERE relations.song2 =  songs.slug) < 1");


if($timefilter) {
	$params = array('start' => $_GET['start'].'', 'end' => $_GET['end'].'');

}
if($timefilter) {
	$qsongs->execute($params);
	$qrelations->execute($params);
	$qstartSongs->execute($params);
} else {
	$qsongs->execute();
	$qrelations->execute();
	$qstartSongs->execute();
}
$startSongs = $qstartSongs->fetchAll();
$json = array();
$json['nodes'] = array('drsounds' => array('color' => 'rgba(0, 0, 0, 1)', 'type' => 'dot', 'label' => 'Dr. Sounds'));
$json['edges'] = array();
$songs = $qsongs->fetchAll();
$relations = $qrelations->fetchAll();
foreach($songs as $song) {
	$json['nodes'][$song['slug']] = array(
		'color' => $song['color'],
		'label' => $song['title'],
		'link' => $song['link'],
		'soundcloud' => $song['soundcloud'],
		'youtube' => $song['youtube'],
		'shape' => 'rectangle'
	);
}
$json['edges'] = array('drsounds' => array());
if($interlace) {
	foreach($startSongs as $song) {

		$json['edges']['drsounds'][$song['slug']] = array();
	}
} else {
	foreach($json['nodes'] as $key => $value) {
		$json['edges']['drsounds'][$key] = array();
	}
	
}
foreach($relations as $relation) {
	$json['edges'][$relation['song1']]= array($relation['song2'] => array());
}
$json = json_encode($json);
echo $json;
?>
