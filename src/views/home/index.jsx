const { Box, Menu, MenuItem, IconButton, AppBar, Container, Toolbar, Typography, Button, Avatar, Grid } = require("@mui/material")
const {InvertColorsIcon} = require("@mui/icons-material");

const HomePage = () => {

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const pages = ['Products', 'Pricing', 'Blog'];

    const dataCacDichVu = [
        {
            title: 'Rửa Xe Sạch, An Toàn',
            content: `<div style="font-size: 19px;"><p>Phương pháp rửa xe tại Cardetailing cam kết chất lượng, loại bỏ bụi bẩn, sình lầy bám trên xe và gầm xe nhưng đảm bảo an toàn 100% cho lớp sơn xe. Ngoài ra, xe càng bóng đẹp hơn sau mỗi lần rửa tại Cardetailing với dung dịch rửa an toàn.</p><p>Dung dịch rửa xe thân thiện với môi trường, độ PH trung tính, càng rửa càng bóng lớp xe!</p><p>Xem thêm chi tiết tại <a href="https://autowash.vn/dich-vu/rua-xe/">dịch vụ rửa xe ô tô Cardetailing</a></p></div>`,
            // icon: <InvertColorsIcon/>
        },
        {
            title: 'Vệ Sinh Nội Thất',
            content: `<div style="font-size: 19px;"><p>Dọn nội thất ô tô tại Cardetailing được chia thành 2 công đoạn:</p><p><strong>Vệ sinh nội thất nâng cao :</strong> làm sạch nội thất ô tô, bảo dưỡng ghế, giặt ghế. Dọn nội thất, bảo dưỡng taplo, tapi cửa. Vệ sinh khe cửa, gioăng, Vệ sinh, làm mới các chi tiết nhựa. Vệ sinh trần xe, la phông .Vệ sinh sàn xe sạch sẽ như mới.</p><p><strong>Phun dưỡng chất: </strong>Sau khi vệ sinh nội thất, Cardetailing sử dụng dung dịch cao cấp giúp dưỡng da ghế, bảo vệ taplo khỏi tia UV. Tránh cho ghế da bị khô và nứt. Nên phun dưỡng chất 3 tháng/1 lần.</p><p>Xem thêm chi tiết tại <a href="https://autowash.vn/dich-vu/ve-sinh-noi-that/">Vệ Sinh Nội Thất Xe Hơi</a> Tại Cardetailing</p></div>`,
            // icons: <InvertColorsIcon/>
        },
        {
            title: 'Vệ Sinh Khoang Máy',
            content: `<div style="font-size: 19px;"><p>AutoWash cung cấp dịch vụ vệ sinh khoang máy, dọn khoang máy chất lượng giá rẻ nhất tại TPHCM. Ngoài ra, chúng tôi còn áp dụng công nghệ hơi nước nóng đối với một số loại xe.</p><p>Sau khi vệ sinh sạch sẽ, Cardetailing sẽ phun dưỡng chất làm mới các chi tiết nhựa trong khoang máy. Đảm bảo khoang máy xe hơi bạn sẽ như xe mới sau quá trình dọn khoang máy tại Cardetailing</p><p>Xem thêm chi tiết tại <a href="https://autowash.vn/dich-vu/ve-sinh-khoang-may-xe/">Vệ Sinh Khoang Máy</a></p></div>`,
            // icons: <InvertColorsIcon/>
        },
        {
            title: 'Đánh Bóng Xe Hơi',
            content: `<div style="font-size: 19px;"><p>Kỹ thuật đánh bóng 5 bước chuyên nghiệp Cardetailing mang lại vẻ ngoài như xe mới. Ngoài ra, kỹ thuật viên đầy kinh nghiệm đảm bảo quy trình an toàn cho thân vỏ xe.</p><p>Xem thêm <a href="https://autowash.vn/dich-vu/danh-bong-xe-hoi/">Đánh Bóng Xe Hơi</a> Tại Cardetailing</p></div>`,
            // icons: <InvertColorsIcon/>
        },
        {
            title: 'Khử Mùi Hôi, Mùi Thuốc Lá',
            content:`<div style="font-size: 19px;"><ul><li>Nhân viên Cardetailing có thiết bị kiểm tra nồng độ mùi gây ra bởi vi khuẩn gây hại. Chúng tôi có công nghệ khử mùi thuốc lá, mùi hôi xe tuyệt đối.</li><li>Sau khi khử mùi, Cardetailing sử dụng công nghệ thứ 2 là C-airfog cho quá trình này, mang lại không gian hoàn toàn mới cho xe bạn.</li></ul><p>Xem thêm <a href="https://autowash.vn/dich-vu/ve-sinh-noi-that/">khử mùi hôi, thuốc lá xe ô tô tại Cardetailing</a></p></div>`,
        },
        {
            title: 'Phủ Ceramic',
            content:`<div style="font-size: 19px;"><p>Cam kết bảo hành chất lượng ceramic, hiệu ứng lá sen, hiệu ứng gương trên xe, giúp lớp sơn xe chống trầy nhẹ, chống tia UV, và luôn sáng bóng như xe mới.</p><p>Xem thêm <a href="https://autowash.vn/dich-vu/phu-ceramic-o-to/">phủ ceramic chất lượng nhất TPHCM tại Cardetailing</a></p></div>`,
        },
    ]

    const dataImage = [
        '<div class="wpb_single_image wpb_content_element vc_align_left"><figure class="wpb_wrapper vc_figure"><div class="vc_single_image-wrapper   vc_box_border_grey"><img width="350" height="133" src="https://autowash.vn/wp-content/uploads/2019/03/vesinhkhoangmay-e1587810345128.jpg" class="vc_single_image-img attachment-full" alt="Hình ảnh thực tế trước và sau khi vệ sinh khoang máy xe tại Cardetailing" srcset="https://autowash.vn/wp-content/uploads/2019/03/vesinhkhoangmay-e1587810345128.jpg 350w, https://autowash.vn/wp-content/uploads/2019/03/vesinhkhoangmay-e1587810345128-300x114-1.jpg 300w" sizes="(max-width: 350px) 100vw, 350px" title="Dịch Vụ 1"></div></figure></div>',
        '<div class="wpb_single_image wpb_content_element vc_align_left"><figure class="wpb_wrapper vc_figure"><div class="vc_single_image-wrapper   vc_box_border_grey"><img width="700" height="272" src="https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-45-231382532323carpet-before.jpg" class="vc_single_image-img attachment-full" alt="Sau khi vệ sinh nội thất ô tô tại Cardetailing" srcset="https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-45-231382532323carpet-before.jpg 700w, https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-45-231382532323carpet-before-300x117.jpg 300w, https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-45-231382532323carpet-before-600x233.jpg 600w" sizes="(max-width: 700px) 100vw, 700px" title="Dịch Vụ 2"></div></figure></div>',
        '<div class="wpb_single_image wpb_content_element vc_align_left"><figure class="wpb_wrapper vc_figure"><div class="vc_single_image-wrapper   vc_box_border_grey"><img width="700" height="272" src="https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-54-291382525669ba11.jpg" class="vc_single_image-img attachment-full" alt="Hình ảnh trước và sau khi làm sạch sàn xe ô tô tại Cardetailing" srcset="https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-54-291382525669ba11.jpg 700w, https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-54-291382525669ba11-300x117.jpg 300w, https://autowash.vn/wp-content/uploads/2019/03/2013-10-23-12-54-291382525669ba11-600x233.jpg 600w" sizes="(max-width: 700px) 100vw, 700px" title="Dịch Vụ 3"></div></figure></div>',
        '<div class="wpb_single_image wpb_content_element vc_align_left"><figure class="wpb_wrapper vc_figure"><div class="vc_single_image-wrapper   vc_box_border_grey"><img width="700" height="272" src="https://autowash.vn/wp-content/uploads/2019/04/2013-10-23-12-53-161382525596ba7.jpg" class="vc_single_image-img attachment-full" alt="Dịch Vụ 4" srcset="https://autowash.vn/wp-content/uploads/2019/04/2013-10-23-12-53-161382525596ba7.jpg 700w, https://autowash.vn/wp-content/uploads/2019/04/2013-10-23-12-53-161382525596ba7-300x117.jpg 300w, https://autowash.vn/wp-content/uploads/2019/04/2013-10-23-12-53-161382525596ba7-600x233.jpg 600w" sizes="(max-width: 700px) 100vw, 700px" title="Dịch Vụ 5"></div></figure></div>'
    ]

    function RenderColumn({item}) {
        return (
            <Box display={'flex'}>
                <img width={48} height={48} src="https://spng.pngfind.com/pngs/s/6-69494_water-icon-png-quotation-about-water-pollution-transparent.png" alt="icon"/>
                <Box pl={3}>
                    <Typography fontSize={'19px'} fontWeight={700}>{item.title}</Typography>
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </Box>
            </Box>
        )
    }

    return (
        <Box>
            {/* Header */}
            <Box>
            <AppBar position="static" >
                <Container maxWidth="xl" sx={{height: "1px"}} >
                    <Toolbar disableGutters >
                    
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page}
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton 
                            // onClick={handleOpenUserMenu} 
                            sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png" />
                        </IconButton>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        // anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        // open={Boolean(anchorElUser)}
                        // onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem 
                                // key={setting} 
                                // onClick={handleCloseUserMenu}
                                >
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
                </AppBar>
                <img  alt="banner" width={'100%'} height={440} src="https://hondaotophattien.com.vn/vnt_upload/news/03_2021/cham-soc-xe-hoi_3.jpg"/>
            </Box>
            {/* Body */}
            <Box px={3}>
                {/* Ưu Đãi Hơn Với Các Combo Chăm Sóc Xe */}
                <Box mt={10} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Typography fontWeight={700} fontSize={44}>Ưu Đãi Hơn Với Các Combo Chăm Sóc Xe</Typography>
                    <Box my={2} height={'2px'} bgcolor={'lightgrey'} width={'100px'}></Box>
                    <Typography mt={3} fontSize={16} color={'blueviolet'}>Luôn luôn là lựa chọn hàng đầu</Typography>
                    <Typography my={3} fontSize={19} textAlign={'center'}>AutoWash cam kết mang đến sự hài lòng cho khách hàng về chất lượng dịch vụ, giá thành cạnh tranh với hệ thống đặt hẹn thông minh cùng đội ngũ nhân viên chuyên nghiệp.</Typography>
                    <Typography fontSize={19} textAlign={'center'}>Hơn thế nữa, chúng tôi luôn đề cao sứ mệnh đem đến cho khách hàng những trải nghiệm thân thiện nhất khi rửa xe truyền thống cũng như kết hợp với các dịch vụ chăm sóc xe ô tô chuyên nghiệp khác.</Typography>
                    <Button size="large" variant="outlined" sx={{
                        borderRadius: "99px",
                        fontSize: "19px",
                        padding: "12px 54px",
                        marginTop: "20px"
                    }}>Đặt hẹn chăm sóc xe ngay</Button>
                    <Box my={4} px={1} height={'1px'} bgcolor={'lightgrey'} width={'100%'}></Box>
                </Box>
                {/* Các Dịch Vụ Chăm Sóc Xe Ô Tô Chuyên Nghiệp Tại Cardetailing */}
                <Box my={10} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Typography fontWeight={700} fontSize={44}>Các Dịch Vụ Chăm Sóc Xe Ô Tô Chuyên Nghiệp Tại Cardetailing</Typography>
                    <Box my={6} height={'2px'} bgcolor={'lightgrey'} width={'100px'}></Box>
                    <Grid container spacing={20} px={10}>
                        {dataCacDichVu.map((data) => (
                            <Grid item xs={4}>
                                <RenderColumn item={data}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {/* Hình ảnh xe sau khi được chăm sóc
                 */}
                 <Box my={10} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Typography fontWeight={700} fontSize={44}>Hình ảnh xe sau khi được chăm sóc tại Cardetailing</Typography>
                    <Box my={6} height={'2px'} bgcolor={'lightgrey'} width={'100px'}></Box>
                    {dataImage.map((item) => {
                        return (
                            <div dangerouslySetInnerHTML={{ __html: item }} />
                        )
                    })}
                 </Box>
            </Box>
            {/* Footer */}
            {/* <Box display={'flex'} sx={{
                    backgroundColor: '#222',
                    height: '200px'
                }}>
                    <Box>
                        <Typography fontSize={'60px'} color={'white'}>Về VinaWash</Typography>
                        <Typography fontSize={'30px'} color={'lightgray'}>VinaWash (AutoWash) là hệ thống rửa xe, chăm sóc & nâng cấp xe ô tô - xe máy chuyên nghiệp tại Việt Nam với các của hàng tại quận 7, quận 9 và quận Tân Phú TPHCM.</Typography>
                        <Box color={'lightgray'} width={'100%'} height={'1px'}></Box>
                    </Box> 
            </Box> */}
            <Box
                px={2}
                
                sx={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: '#222',
                    paddingTop: "1rem",
                    paddingBottom: "1rem"
                }}
                >
                <Container maxWidth="lg">
                    <Box display={'flex'} alignItems={'end'} justifyContent={'space-between'}>
                        <Box item xs={6} width={'400px'}>
                            <Typography color="white" variant="h1">
                                Cardetailing
                            </Typography>
                            <Typography color="textSecondary" marginTop={1} fontSize={'16px'}>
                                VinaWash (Cardetailing) là hệ thống rửa xe, chăm sóc & nâng cấp xe ô tô - xe máy chuyên nghiệp tại Việt Nam với các của hàng tại quận 7, quận 9 và quận Tân Phú TPHCM.
                            </Typography>
                        </Box>
                        <Box item xs={6}>
                            <Typography color="textSecondary">Số diện thọai: 0853300586</Typography>
                            <Typography color="textSecondary">Thư diện tử: cardetailing@gmail.com</Typography>
                            <Typography color="textSecondary">Mã số thuế: 194325698</Typography>
                            
                        </Box>
                    </Box>
                </Container>
                <Box height={'1px'} width={'100%'} bgcolor={"lightgrey"} my={2}></Box>
                <Box height={'30px'} display={'flex'} alignItems="end"  width={'100%'} justifyContent={'space-between'} px={22}>
                    <Typography align="center" fontSize={14} color={"lightgrey"}>
                        Cardetailing - Hệ Thống Rửa Xe Và Chăm Sóc Xe Chuyên Nghiệp Hàng đầu Việt Nam
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        @{`${new Date().getFullYear()} `}
                    </Typography>
                </Box>
                </Box>
        </Box>
    )
}

export default HomePage