package item

type Item struct {
	Server string `json:"server"`
	Item string `json:"item"`
	Amount int32 `json:"amount"`
	Price int32 `json:"price"`
	LocationX float32 `json:"locationx"`
	LocationY float32 `json:"locationy"`
}
