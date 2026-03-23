package models

type ManhwaViewRaw struct {
	Name     string `json:"name"`
	Chapters Images `json:"chapter"`
	ID       string `json:"_id"`
}

type Images struct {
	Chapter int64    `json:"chapter"`
	Img     []string `json:"img"`
}
type NavigationRaw struct {
	ChapterAnterior  string `json:"chapterAnterior"`
	ChapterSiguiente string `json:"chapterSiguiente"`
}
