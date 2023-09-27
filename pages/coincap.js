import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/features/favorites-slice";
import { logout } from "../redux/features/auth-slice";
import { useRouter } from "next/navigation";

export default function CoinCap() {
    const [assets, setAssets] = useState([])
    const [assetInterval, setAssetInterval] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [onlyFavorites, setOnlyFavorites] = useState(false)
    const [userData, setUserData] = useState({})
    const [assetsBck, setAssetsBck] = useState([]);

    const favoritesData = useSelector(state => state.favorites.value)
    const userReduxData = useSelector(state => state.auth.value)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets').then(res => res.json()).then(data => {
        setAssets(data.data)})
        setUserData(userReduxData)
    },[])

    const getAssetData = (asset, index) => {
        if (index !== selectedIndex) {
            fetch(`https://api.coincap.io/v2/assets/${asset.name.toLowerCase()}/history?interval=h1`).then(res => res.json()).then(data => {
                let historyData = data.data.length >= 24 ? data.data.slice(0,24) : data.data.length === 0 ? [{priceUsd: "There's no history for this coin"}] : data.data
                setAssetInterval(historyData)
                setSelectedIndex(index)
            }).catch(error => {
                setAssetInterval([{priceUsd: "There's no history for this coin"}])
                setSelectedIndex(index)
            })
        } else {
            setSelectedIndex(-1)
        }
    }

    const showFavorites = () => {
        if(onlyFavorites) {
            setAssets([...assetsBck])
        } else {
            setAssetsBck([...assets])
            const filteredAssets = assets.filter(asset => {
                return favoritesData.includes(asset.id)
            })
            setAssets(filteredAssets)
        }

        setOnlyFavorites(!onlyFavorites)
    }

    const logoutFunc = () => {
        dispatch(logout())
        router.push('/login')
    }

    return (<>
        <nav>
            <Button variant="secondary" onClick={showFavorites} >
            {!onlyFavorites ? 'Show All' : 'Show favorites'}
            </Button>
            <Button variant="secondary" onClick={logoutFunc} >
            Logout
            </Button>
            <div>{userData.name}</div>
        </nav>
        <div>
            {assets.map( (asset, index) => {
                
                    return <Card key={index}>
                                <Card.Body>
                                    <Card.Text>{asset.id}</Card.Text>
                                    <Button variant="primary" onClick={() => getAssetData(asset, index)}>
                                        Show History
                                    </Button>
                                    {favoritesData.includes(asset.id) ? <i className="bi bi-star-fill" onClick={() => dispatch(remove(asset.id))}></i> : <i className="bi bi-star" onClick={() => dispatch(add(asset.id))}></i>}
                                </Card.Body>
                                { selectedIndex === index && assetInterval.map((history, idx) => {
                                    return (<Card.Footer key={`${asset.id}-${idx}`}>
                                        <div key={idx}>{history.priceUsd}</div>
                                    </Card.Footer>)
                                })}
                            </Card>
            }
                
            )}
        </div>
        </>
    )
}