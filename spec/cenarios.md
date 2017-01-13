# Cenário de execução do comando PING

Para o correto funcionamento do algoritmo do ping-api é necessário identificar os possíveis cenários de resposta que o comando ping pode gerar.

Nesse sentido esta página tenta detalhar algumas das possibilidades através de comandos em alguns sistemas operacionais.

Contudo, alguns cenários ainda devem ser analisados como:

* Respostas em outros idiomas
* Resposatas com Request timed out ou Destination Host unreachable

## Ubuntu
```
$ ping -c1 8.8.8.8
  PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
  64 bytes from 8.8.8.8: icmp_seq=1 ttl=50 time=164 ms

  --- 8.8.8.8 ping statistics ---
  1 packets transmitted, 1 received, 0% packet loss, time 0ms
  rtt min/avg/max/mdev = 164.360/164.360/164.360/0.000 ms
```

```
$ ping -c1 www.google.com
  PING www.google.com (177.35.32.113) 56(84) bytes of data.
  64 bytes from b1232071.virtua.com.br (177.35.32.113): icmp_seq=1 ttl=63 time=13.7 ms

  --- www.google.com ping statistics ---
  1 packets transmitted, 1 received, 0% packet loss, time 0ms
  rtt min/avg/max/mdev = 13.706/13.706/13.706/0.000 ms
```

```
$ ping -c2 8.8.8.8
  PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
  64 bytes from 8.8.8.8: icmp_seq=1 ttl=50 time=164 ms
  From 8.8.8.8 icmp_seq=2 Destination Net Unreachable

  --- 8.8.8.8 ping statistics ---
  1 packets transmitted, 1 received, 50.0% packet loss, time 0ms
  rtt min/avg/max/mdev = 164.360/164.360/164.360/0.000 ms
```

```
$ ping -c1 8.8.8.250
PING 8.8.8.250 (8.8.8.250) 56(84) bytes of data.
```

```
--- 8.8.8.250 ping statistics ---
1 packets transmitted, 0 received, 100% packet loss, time 0ms
```

```
$ ping -c1 google
ping: unknown host google
```

```
$ ping -c1 8.8.8.300
ping: unknown host 8.8.8.300
```

## MAC OS X
```
$ ping -c1 8.8.8.8
  PING 8.8.8.8 (8.8.8.8): 56 data bytes
  64 bytes from 8.8.8.8: icmp_seq=0 ttl=50 time=143.865 ms

  --- 8.8.8.8 ping statistics ---
  1 packets transmitted, 1 packets received, 0.0% packet loss
  round-trip min/avg/max/stddev = 143.865/143.865/143.865/0.000 ms
```

```
$ ping -c1 www.google.com
  PING www.google.com (177.35.32.121): 56 data bytes
  64 bytes from 177.35.32.121: icmp_seq=0 ttl=61 time=18.753 ms

  --- www.google.com ping statistics ---
  1 packets transmitted, 1 packets received, 0.0% packet loss
  round-trip min/avg/max/stddev = 18.753/18.753/18.753/0.000 ms
```

```
$ ping -c2 8.8.8.8
  PING 8.8.8.8 (8.8.8.8): 56 data bytes
  64 bytes from 8.8.8.8: icmp_seq=0 ttl=50 time=143.865 ms
  Request timeout for icmp_seq 2

  --- 8.8.8.8 ping statistics ---
  1 packets transmitted, 1 packets received, 50.0% packet loss
  round-trip min/avg/max/stddev = 143.865/143.865/143.865/0.000 ms
```

```
$ ping -c1 8.8.8.250
  PING 8.8.8.250 (8.8.8.250): 56 data bytes

  --- 8.8.8.250 ping statistics ---
  1 packets transmitted, 0 packets received, 100.0% packet loss
```

```

$ ping -c1 google
  ping: cannot resolve google: Unknown host
```

```
$ ping -c1 8.8.8.300
  ping: cannot resolve 8.8.8.300: Unknown host
```
## Windows
```
$ ping -n 1 8.8.8.8
Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=17ms TTL=53

Ping statistics for 8.8.8.8:
    Packets: Sent = 1, Received = 1, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 164ms, Maximum = 164ms, Average = 164ms
```

```
$ ping -n 1 www.google.com
Pinging www.google.com [172.217.29.68] with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=17ms TTL=53

Ping statistics for 8.8.8.8:
    Packets: Sent = 1, Received = 1, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 164ms, Maximum = 164ms, Average = 164ms
```

```
$ ping -n 1 google
```
