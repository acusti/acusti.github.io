---
layout: post
category: blog
published: true
title: Force Backblaze on Mac to backup excluded folders
baseline: How to edit default Backblaze exclusions
credit: "Blazing like a [1974 fire department demonstration](https://www.flickr.com/photos/usnationalarchives/4271777745)"
splash: "media/car-on-fire-demo-1974.jpg"
tags:
  - guide
  - backup
---

**Update May 4, 2015:** This technique no longer works. A recent Backblaze update has added strict validation controls that prevents their forbidden directories from being enabled. Even if you edit the `bzinfo.xml` file and explicitly Lock it from the Finder’s Get Info pane, Backblaze will not accept the changes into its own config. I will leave the original post here for the record, but the technique is now useless.

-----------

Please note: this functionality is entirely undoc&shy;umen&shy;ted and unsup&shy;ported, and as such, it could dest&shy;roy your Back&shy;blaze back&shy;ups (see blaz&shy;ing car as cau&shy;tion&shy;ary meta&shy;phor). Do not proceed if you are unwilling to accept that risk. That said, it’s useful, so for those confident in their system of multiple redundant backups and comfortable editing XML, I’ve posted these instructions:

On a [recent episode][atp-episode] of the Accidental Tech Podcast, [John Siracusa][] mentioned at the end of an ad spot for [Backblaze][] that it is easy (on a Mac) to modify Backblaze’s exclusions XML file to get it to back up even directories that are listed in the Backblaze exclusions preferences pane and are not editable (i.e. clicking them brings up a dialog saying “Backblaze does not allow backing up the [name-of-folder] folder”). That got me excited, because as an avid user of [homebrew][], I’ve always wanted to back up my `/usr/local` folder to Backblaze, but had resigned myself to the reality that such a thing was just not possible. I started googling for instructions for this allegedly easy modification and was surprised to find absolutely *nothing* on the internet about it. In the end, I figured it out by digging around my Library folders. Here’s how:

1. Backblaze’s data is stored in the package `/Library/Backblaze.bzpkg`. To see that data, go to the root `Library` folder, right-click the `Backblaze.bzpkg`, and click “Show Package Contents”.
2. Go to the `bzdata` folder and open the `bzinfo.xml` file in a text editor.
3. Find the `<do_backup>` section (node) and remove any `<bzdirfilter>` nodes with `whichfiles="none"` that you don’t want (or switch `whichfiles="none"` to `whichfiles="all"`).
4. If you have the Backblaze preferences pane open, quit System Preferences, then reopen the Backblaze preferences pane, click Settings, and confirm that your new settings have taken effect.

Lastly, keep in mind that having a single backup is not a backup strategy! Losing a backup is a fairly common occurence, and if that’s all you’ve got, you’ll be shit out of luck when you actually need it. Please, at a minimum, maintain one local and one offsite backup. For most readers of this post who I assume already use Backblaze for Mac, the simplest MVBS (Minimal Viable Backup Strategy) is Time Machine + Backblaze.

[atp-episode]: http://atp.fm/episodes/97
[John Siracusa]: http://hypercritical.co/about/
[Backblaze]: https://www.backblaze.com/atp
[homebrew]: http://brew.sh/
