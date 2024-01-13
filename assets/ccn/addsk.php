<?php
$config['HYPER_API']="VOIDXD";
header("content-type: application/json");
function hyper_encode($encode = "")
{
    $ciphering = "AES-128-CTR";

    $iv_length = openssl_cipher_iv_length($ciphering);
    $options = 0;

    $encryption_iv = '1234567891011121';

    $encryption_key = "hyperencrypt";

    $encryption = openssl_encrypt(
        $encode,
        $ciphering,
        $encryption_key,
        $options,
        $encryption_iv
    );
    return  $encryption;
}
function rest($msg = "")
{
    echo json_encode(
        array(
            "message" => $msg,
        )
    );
}
$sk_key = "";

if (isset($_GET['sk_key'])) {
    $sk_key = $_GET['sk_key'];
}
$api_key = "";

if (isset($_GET['api_key'])) {
    $api_key = $_GET['api_key'];
}
if ($api_key == "") {
    return rest("HYPER API KEY required.");
} else if ($config['HYPER_API'] !== $api_key) {
    return rest("Invalid API Key provided.");
} else if ($sk_key != "") {
    $sk = hyper_encode($sk_key);
    file_put_contents('./sk.txt', $sk . PHP_EOL, FILE_APPEND | LOCK_EX);
    return rest("sk key has been added!");
} else {
    return rest("Missing parameter");
}
