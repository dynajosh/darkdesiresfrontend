import { Skeleton } from "@mui/material";
import './index.css'

const Shimmer = () => {
    return(
        <div>
            <Skeleton variant="rounded"  animation="wave" sx={{ fontSize: '23.75rem' }} className="post-card"/>
        </div>
    )
}

export default Shimmer