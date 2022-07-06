# Resource Watchdog

This project was highly inspired by [resmon](https://github.com/Njanderson/resmon), using its main concept for watching of resource usage.

Resource monitoring is entirely done using [systeminformation](https://github.com/sebhildebrandt/systeminformation).

## Features

Shows stats of certain resources of the system in the VSCode statusbar.

Currently supported features:
- Battery Percentage (if available)
- CPU Frequency
  - Windows: will report the maximum CPU frequency.
  - M1 Mac: will report the maximum CPU frequency.
- CPU Temperature (with certain limits)
  - Windows: some CPUs might not be supported properly. Also, it might not work if not run with admin privileges. See [Known Issue of systeminformation](https://github.com/sebhildebrandt/systeminformation#windows-temperature-battery-)
  - Mac: does not work on Mac. See [Known Issue of systeminformation](https://github.com/sebhildebrandt/systeminformation#macos---temperature-sensor)
  - Linux: [Known Issue of systeminformation](https://github.com/sebhildebrandt/systeminformation#linux-temperature)
- CPU Usage
- Disk Stats
- Memory Usage
- Network Stats (received and transferred byte/seconds)
- Swap Usage
- Uptime


> Note: Newest hardware such as Apple's M2 or other newer Intel, AMD CPUs might not be supported right away. This extension heavily relies on [systeminformation](https://github.com/sebhildebrandt/systeminformation)

## Extension Settings

This extension contributes the following settings:

* `resourceWatchdog.battery.show`: Shows CPU usage
* `resourceWatchdog.cpuFrequency.show`: Shows current CPU frequency. On Windows & M1 Mac, it will show the maximum CPU frequency.
* `resourceWatchdog.cpuFrequency.unit`: Unit of CPU frequency. Options are: `GHz`, `MHz`, `KHz` or `Hz`.
* `resourceWatchdog.cpuTemperature.show`: Shows current CPU temperature. Check known issues for more information.
* `resourceWatchdog.cpuTemperature.unit`: Unit of CPU temperature. Options are: `C` or `F`.
* `resourceWatchdog.cpuUsage.show`: Shows current CPU usage.
* `resourceWatchdog.disk.show`: Shows disk usage of added disks.
* `resourceWatchdog.disk.format`: Format of disk usage. Options are: `PercentRemaining`, `PercentUsed`, `Remaining` or `UsedOutOfTotal`.
* `resourceWatchdog.disk.drives`: Disks to show. If empty, no disks will be shown.
* `resourceWatchdog.memory.show`: Shows memory usage.
* `resourceWatchdog.memory.unit`: Unit of memory usage. Options are: `GB`, `MB`, `KB` or `B`.
* `resourceWatchdog.memory.dangerThreshold`: Threshold for memory usage. If memory usage is above this threshold, the extension will add a warning icon after the value.
* `resourceWatchdog.networkIn.show`: Shows received bytes/second of all network interfaces.
* `resourceWatchdog.networkOut.show`: Shows transferred bytes/second of all network interfaces.
* `resourceWatchdog.swap.show`: Shows swap usage.
* `resourceWatchdog.swap.unit`: Unit of swap usage. Options are: `GB`, `MB`, `KB` or `B`.
* `resourceWatchdog.swap.dangerThreshold`: Threshold for swap usage. If swap usage is above this threshold, the extension will add a warning icon after the value.
* `resourceWatchdog.uptime.show`: Shows uptime.
* `resourceWatchdog.color`: Color of the status bar text (hex code).
* `resourceWatchdog.leftAlignment`: If true, the status bar text will be left aligned, otherwise it will be right aligned.
* `resourceWatchdog.precision`: Number of decimal places to show. Options is: 0 ≤ precision ≤ 4.
* `resourceWatchdog.updateFrequencyMs`: Update frequency in milliseconds. You might want to increase this if you see a lot of CPU usage to reduce update interval.

## Known Issues

Known Issues are already mentioned for each feature. 

For a complete list of known issues, see the [Known Issues of systeminformation](https://github.com/sebhildebrandt/systeminformation#known-issues)


## Release Notes

## [1.0.0] - Initial Version 🎉

- Support for:
  - Battery Percentage
  - CPU Frequency (with certain limits)
  - CPU Temperature (with certain limits)
  - CPU Usage
  - Disk Stats
  - Memory Usage
  - Network Stats (received and transferred byte/seconds)
  - Swap Usage
  - Uptime

## Credits

Written by Alexander Kainzinger [alexkainzinger](https://github.com/alexkainzinger)

#### Creator of systeminformation

Sebastian Hildebrandt [sebhildebrandt](https://github.com/sebhildebrandt)

#### Creator of resmon

Nick Anderson [Njanderson](https://github.com/Njanderson)


## License [![MIT license][license-img]][license-url]

>[`MIT`][license-url] License (MIT)
>
>Copyright &copy; 2022 Alexander Kainzinger
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in
>all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>THE SOFTWARE.
>
>Further details see [LICENSE](LICENSE) file.

[license-url]: https://github.com/alexkainzinger/resource-watchdog/blob/main/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square