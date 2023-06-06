# note-taker

## Table of Contents

1. [Description](#description)
    * [User Story](#user-story)
    * [Acceptance Criteria](#acceptance-criteria)
2. [Installation and Use](#installation-and-use)
    * [Example Use](#example-use)
3. [Comments](#comments)
4. [Sources](#sources)

## Description

This is a note-taking web application.  You can type up several notes and save them for later.

### User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```


### Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Installation and Use

Here is the link to the Heroku website [note-taker-202306.herokuapp.com](https://note-taker-202306.herokuapp.com/).

Enter both title and text for your note, and save by clicking the icon in the top left corner.  Your new note will appear on the list to the right.

You can open any of the notes in the list by clicking on their titles, and they can be deleted by clicking the red trash icon.

Create another note by clicking the plus icon in the top left corner!

![Screenshot showing use](.\assets\images\note-taker-02.png)

See [assets\logs\](.\assets\logs\note-taker-202306-log.txt) for an example of what the Heroku application logs look like upon deployment and use.

## Comments

Most of my added code was copied from the Bootcamp Expressjs Mini-Project, and replacing 'tips' with 'notes'.  However, I did add extensive JSDoc comments detailing what exactly each part of all the functions were doing, and what type each variable was.  I think that was very helpful in deciphering the starter code, especially when there needs to be a lot of similarly named objects that do slightly different things.

## Sources

I started out by copying a large portion of the Bootcamp Mini-Project for Week 11 ([Gitlab Link](https://ucdavis.bootcampcontent.com/ucdavis-boot-camp/UCD-VIRT-FSF-PT-03-2023-U-LOLC/-/tree/main/11-Express/01-Activities/Day3/28-Stu_Mini-Project/Main)). This includes the very cute 404 image.