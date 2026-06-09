import {
  FaBroom, FaSprayCan, FaBuilding, FaBoxOpen,
  FaShieldAlt, FaLeaf, FaClock, FaCheckCircle, FaStar,
} from 'react-icons/fa'
import {
  MdOutlineVerified, MdOutlineEco, MdOutlineGroups, MdOutlineStar,
} from 'react-icons/md'

const ICONS = {
  FaBroom, FaSprayCan, FaBuilding, FaBoxOpen,
  FaShieldAlt, FaLeaf, FaClock, FaCheckCircle, FaStar,
  MdOutlineVerified, MdOutlineEco, MdOutlineGroups, MdOutlineStar,
}

export default function Icon({ name, className, size }) {
  const Cmp = ICONS[name] || FaStar
  return <Cmp className={className} size={size} />
}
