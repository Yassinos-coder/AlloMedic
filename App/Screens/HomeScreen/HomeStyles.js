import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    actionView: {
        zIndex: 10, // Bring it on top
        position: 'absolute', // Positioning required for zIndex to work
        bottom: 20, // Positioned at the bottom
        alignSelf: 'center', // Center horizontally
        backgroundColor: 'white', // Better contrast for shadow visibility
        borderRadius: 20,
        width: 300,
        height: 100,
        flexWrap: 'wrap', // Allow wrapping for nested views
        flexDirection: 'row', // Arrange views in rows
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
    nestedView: {
        flexBasis: '50%', // Take 50% of the container's width
        justifyContent: 'center',
        alignItems: 'center',
    },
    Pressables: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
    },
    PressablesText: {
        color: 'white', // White text for visibility
        fontFamily: 'poppins-semibold',
        textAlign: 'center',
        fontSize: 14,
    },
    refocusMap: {
        width: 50,
        position: 'absolute',
        zIndex: 1000,
        flex: 1,
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 15, // Add margin to move the button away from the right edge
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent dark background
        justifyContent: 'center',
        alignItems: 'center',
    },
    callPopUpView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // Ensure it's on top of other elements
        top: 0, // Center vertically
        bottom: 0, // Center vertically
        left: 0, // Center horizontally
        right: 0, // Center horizontally
        zIndex: 20, // Higher zIndex to ensure it appears above other elements
    }
});

export default HomeStyles;
