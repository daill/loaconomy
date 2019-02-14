package item

import "time"

type Location struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
}

type Bonus struct {
	Attack int32 `json:"attack"`
	Defense int32 `json:"defense"`
	Durability int32 `json:"durability"`
	Accuracy int32 `json:"accuracy"`
}

type Item struct {
	Server string `json:"server"`
	Item string `json:"item"`
	Amount int32 `json:"amount"`
	Price int32 `json:"price"`
	PricePerUnit float32 `json:"price_per_unit"`
	Location Location `json:"location"`
	Seen time.Time `json:"seen"`
	Bonus Bonus `json:"bonus"`
	Kind int32 `json:"kind"`
}
