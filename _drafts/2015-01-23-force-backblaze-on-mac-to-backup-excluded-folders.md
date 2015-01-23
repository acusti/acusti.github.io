---
layout: post
category: blog
published: false
title: Force Backblaze on Mac to backup excluded folders
---

On a [recent episode][atp-episode] of the Accidental Tech Podcast, [John Siracusa][] mentioned at the end of an ad spot for [Backblaze][] that it is easy to modify Backblaze’s exclusions XML file to get it to back up even directories that are listed in the Backblaze exclusions and are not editable (clicking them brings up a dialog saying “Backblaze does not allow backing up the [name-of-folder] folder”). That made me excited, because as an avid user of homebrew, I would love to be able to back up my `/usr/local` folder to Backblaze and had previously believed that such a thing was just not possible. So, I started googling for intstructions for this apparently easy modification and was surprised to find absolutely *nothing* on the internet about it. I figured it out myself, and to help others in my situation, here’s how to do so on a Mac:

1. Backblaze’s data is stored in the package `/Library/Backblaze.bzpkg`. To see that data, go to the system’s (root) `Library` folder, right-click the `Backblaze.bzpkg`, and click “Show Package Contents”.
2. Go to the `bzdata` folder and then open the `bzinfo.xml` file.
3. Find the `<do_backup>` section (node) and remove any `<bzdirfilter>` nodes with `whichfiles="none"` that you don’t want (or switch `whichfiles="none"` to `whichfiles="all"`.
4. If you have the Backblaze preferences pane open, quit System Preferences, then reopen the Backblaze preferences pane, click Settings, and confirm that your new settings have taken effect.

Enjoy your newly find back up freedom!

[atp-episode]: http://atp.fm/episodes/97
[John Siracusa]: http://hypercritical.co/about/
[Backblaze]: https://www.backblaze.com/atp
