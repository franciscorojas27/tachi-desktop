package models

type ManhwaView struct {
	ID         string     `json:"id"`
	Name       string     `json:"name"`
	Chapter    int64      `json:"chapter"`
	Images     []string   `json:"images"`
	Navigation Navigation `json:"navigation"`
}

type Navigation struct {
	PreviousChapter NavigationChapter
	NextChapter     NavigationChapter
}

type NavigationChapter struct {
	ID      string `json:"id"`
	Chapter string `json:"chapter"`
}
